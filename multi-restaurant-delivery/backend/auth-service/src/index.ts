// Ensure TypeScript finds the module declarations for passport and passport-local
/// <reference path="./global.d.ts" />
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import Redis from 'ioredis';
import { z } from 'zod';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import winston from 'winston';

// Fix nullish coalescing operator usage for SonarLint
const PORT = process.env.PORT ?? 4000;
const JWT_SECRET = process.env.JWT_SECRET ?? '';
const REFRESH_SECRET = process.env.REFRESH_SECRET ?? '';

// DB & Redis Setup
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: +(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? 'postgres',
  database: process.env.DB_NAME ?? 'auth',
  entities: [User],
  synchronize: true,
});
const redisClient = new Redis({
  host: process.env.REDIS_HOST ?? 'localhost',
  port: +(process.env.REDIS_PORT ?? 6379),
});

// Passport Local Strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email: string, password: string, done: (err: any, user?: any, options?: any) => void) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email });
    if (!user || !(await user.validatePassword(password))) {
      return done(null, false, { message: 'Ungültige Anmeldedaten' });
    }
    return done(null, user);
  }),
);

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

// Express App
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(rateLimit.default({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}) as unknown as express.RequestHandler);
app.use(express.json());
app.use(passport.initialize());

// Centralized error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  logger.error(err.stack ?? err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Health check endpoint
app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

// Registration validation schema
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  roles: z.array(z.string()).optional(),
});

// Registration Endpoint
app.post('/register', async (req: Request, res: Response) => {
  const parseResult = registerSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Invalid input', details: parseResult.error.errors });
  }
  const repo = AppDataSource.getRepository(User);
  // Ensure user is not an array (defensive, but zod already checks)
  if (Array.isArray(parseResult.data)) {
    return res.status(400).json({ error: 'Array input not allowed' });
  }
  // userObj ist bereits vom Typ User, explizit typisieren um TS Fehler zu vermeiden
  const savedUser: User = await repo.save(parseResult.data as Partial<User>);
  res.status(201).json({ id: savedUser.id, email: savedUser.email });
});

// Login validation schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Login successful, returns tokens
 *       401:
 *         description: Invalid credentials
 */

// Login Endpoint
app.post('/login', (req: Request, res: Response, next) => {
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Invalid input', details: parseResult.error.errors });
  }
  passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
    if (err || !user) {
      return res.status(401).json({ error: info?.message ?? 'Invalid credentials' });
    }
    const payload = { sub: user.id, roles: user.roles };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
    redisClient.set(user.id.toString(), refreshToken);
    res.json({ accessToken, refreshToken });
  })(req, res, next);
});

/**
 * @openapi
 * /refresh:
 *   post:
 *     summary: Refresh access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token
 *       401:
 *         description: Token ungültig oder abgelaufen
 */
app.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const payload: any = jwt.verify(refreshToken, REFRESH_SECRET);
    const stored = await redisClient.get(payload.sub);
    if (stored !== refreshToken) throw new Error('Ungültiger Refresh-Token');
    const newAccess = jwt.sign({ sub: payload.sub, roles: payload.roles }, JWT_SECRET, {
      expiresIn: '15m',
    });
    res.json({ accessToken: newAccess });
  } catch {
    res.status(401).json({ error: 'Token ungültig oder abgelaufen' });
  }
});

/**
 * @openapi
 * /me:
 *   get:
 *     summary: Get current user (JWT required)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User info
 *       401:
 *         description: Unauthorized
 */
app.get('/me', (req, res) => {
  const authHeader = req.headers.authorization?.split(' ')[1];
  if (!authHeader) return res.sendStatus(401);
  try {
    const user = jwt.verify(authHeader, JWT_SECRET);
    res.json(user);
  } catch {
    res.sendStatus(401);
  }
});

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Auth Service API',
    version: '1.0.0',
    description: 'API documentation for the authentication service',
  },
  servers: [
    { url: 'http://localhost:4000', description: 'Local server' },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: [__filename],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
// @ts-expect-error Express type mismatch due to monorepo types
app.use('/api-docs', (swaggerUi.serve as unknown) as express.RequestHandler, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid input
 */

app.listen(PORT, () => console.log(`Auth-Service läuft auf Port ${PORT}`));
