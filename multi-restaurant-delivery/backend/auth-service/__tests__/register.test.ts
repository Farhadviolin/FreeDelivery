import request from 'supertest';
import express from 'express';
import { z } from 'zod';

// Minimal app for test (replace with actual app import in real setup)
const app = express();
app.use(express.json());
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
app.post('/register', (req, res) => {
  const parseResult = registerSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  res.status(201).json({ id: 1, email: req.body.email });
});

describe('POST /register', () => {
  it('should reject invalid email', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'notanemail', password: 'password123' });
    expect(res.status).toBe(400);
  });
  it('should reject short password', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: 'short' });
    expect(res.status).toBe(400);
  });
  it('should accept valid registration', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe('test@example.com');
  });
});
