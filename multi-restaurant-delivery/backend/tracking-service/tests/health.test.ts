import request from 'supertest';
import express from 'express';

const app = express();
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

describe('GET /health', () => {
  it('should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
