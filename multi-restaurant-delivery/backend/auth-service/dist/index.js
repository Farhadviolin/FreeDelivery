"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Ensure TypeScript finds the module declarations for passport and passport-local
/// <reference path="./global.d.ts" />
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const ioredis_1 = __importDefault(require("ioredis"));
const PORT = process.env.PORT ?? 4000;
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
// DB & Redis Setup
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: +(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASS ?? 'postgres',
    database: process.env.DB_NAME ?? 'auth',
    entities: [User_1.User],
    synchronize: true,
});
const redisClient = new ioredis_1.default({
    host: process.env.REDIS_HOST ?? 'localhost',
    port: +(process.env.REDIS_PORT ?? 6379),
});
// Passport Local Strategy
passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'email' }, async (email, password, done) => {
    const userRepo = AppDataSource.getRepository(User_1.User);
    const user = await userRepo.findOneBy({ email });
    if (!user || !(await user.validatePassword(password))) {
        return done(null, false, { message: 'Ungültige Anmeldedaten' });
    }
    return done(null, user);
}));
// Express App
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
// Registration Endpoint
app.post('/register', async (req, res) => {
    const repo = AppDataSource.getRepository(User_1.User);
    const userObj = repo.create(req.body);
    // Ensure user is not an array
    if (Array.isArray(userObj)) {
        return res.status(400).json({ error: 'Array input not allowed' });
    }
    // userObj ist bereits vom Typ User, explizit typisieren um TS Fehler zu vermeiden
    const savedUser = await repo.save(userObj);
    res.status(201).json({ id: savedUser.id, email: savedUser.email });
});
// Login Endpoint
app.post('/login', passport_1.default.authenticate('local', { session: false }), (req, res) => {
    const payload = { sub: req.user.id, roles: req.user.roles };
    const accessToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
    // Store refreshToken in Redis for revocation
    redisClient.set(req.user.id.toString(), refreshToken);
    res.json({ accessToken, refreshToken });
});
// Token Refresh
app.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, REFRESH_SECRET);
        const stored = await redisClient.get(payload.sub);
        if (stored !== refreshToken)
            throw new Error('Ungültiger Refresh-Token');
        const newAccess = jsonwebtoken_1.default.sign({ sub: payload.sub, roles: payload.roles }, JWT_SECRET, {
            expiresIn: '15m',
        });
        res.json({ accessToken: newAccess });
    }
    catch {
        res.status(401).json({ error: 'Token ungültig oder abgelaufen' });
    }
});
// Protected Route Example
app.get('/me', (req, res) => {
    const authHeader = req.headers.authorization?.split(' ')[1];
    if (!authHeader)
        return res.sendStatus(401);
    try {
        const user = jsonwebtoken_1.default.verify(authHeader, JWT_SECRET);
        res.json(user);
    }
    catch {
        res.sendStatus(401);
    }
});
app.listen(PORT, () => console.log(`Auth-Service läuft auf Port ${PORT}`));
