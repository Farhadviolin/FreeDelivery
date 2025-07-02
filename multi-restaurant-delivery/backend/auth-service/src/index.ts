import 'reflect-metadata';
import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import session from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

// DB & Redis Setup
const AppDataSource = new DataSource({
  /* Postgres config */
});
const redisClient = new Redis({
  /* Redis config */
});

// Passport Local Strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email });
    if (!user || !(await user.validatePassword(password))) {
      return done(null, false, { message: 'Ungültige Anmeldedaten' });
    }
    return done(null, user);
  }),
);

// Express App
const app = express();
app.use(express.json());
app.use(passport.initialize());

// Registration Endpoint
app.post('/register', async (req, res) => {
  const repo = AppDataSource.getRepository(User);
  const user = repo.create(req.body);
  await repo.save(user);
  res.status(201).json({ id: user.id, email: user.email });
});

// Login Endpoint
app.post('/login', passport.authenticate('local', { session: false }), (req, res: any) => {
  const payload = { sub: req.user.id, roles: req.user.roles };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
  // Store refreshToken in Redis for revocation
  redisClient.set(req.user.id.toString(), refreshToken);
  res.json({ accessToken, refreshToken });
});

// Token Refresh
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

// Protected Route Example
app.get('/me', (req, res) => {
  const authHeader = req.headers.authorization?.split(' ')[1];
  if (!authHeader) return res.sendStatus(401);
  try {
    const user = jwt.verify(authHeader, JWT_SECRET);
    res.json(user);
  } catch {
    res.sendStatus(403);
  }
});

// Start
AppDataSource.initialize().then(() => {
  app.listen(PORT, () => console.log(`Auth-Service auf Port ${PORT}`));
});
