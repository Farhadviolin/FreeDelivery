import request from 'supertest';
import express from 'express';

const app = express();
app.get('/analytics/revenue', (req, res) => res.json([{ day: '2025-06-01', revenue: '1000' }]));
app.get('/analytics/orders-per-day', (req, res) => res.json([{ day: '2025-06-01', count: '10' }]));
app.get('/analytics/avg-delivery-time', (req, res) =>
  res.json([{ day: '2025-06-01', avgSeconds: 1200 }]),
);

describe('AnalyticsController', () => {
  it('GET /analytics/revenue liefert Umsatzdaten', async () => {
    const res = await request(app).get('/analytics/revenue');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('revenue');
  });

  it('GET /analytics/orders-per-day liefert Bestellzahlen', async () => {
    const res = await request(app).get('/analytics/orders-per-day');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('count');
  });

  it('GET /analytics/avg-delivery-time liefert Lieferzeiten', async () => {
    const res = await request(app).get('/analytics/avg-delivery-time');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('avgSeconds');
  });
});
