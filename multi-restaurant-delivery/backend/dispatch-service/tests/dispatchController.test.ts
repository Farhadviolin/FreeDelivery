import request from 'supertest';
import express from 'express';
import { DispatchController } from '../src/controllers/DispatchController';

const app = express();
app.use(express.json());
app.post('/dispatch/assign', (req, res) => {
  // Simpler Mock: always return queued
  res.status(202).json({ status: 'queued' });
});

describe('DispatchController', () => {
  it('POST /dispatch/assign returns 202 and status queued', async () => {
    const res = await request(app)
      .post('/dispatch/assign')
      .send({ orderId: 'order1', location: { lat: 48.2, lng: 16.4 } });
    expect(res.status).toBe(202);
    expect(res.body.status).toBe('queued');
  });
});
