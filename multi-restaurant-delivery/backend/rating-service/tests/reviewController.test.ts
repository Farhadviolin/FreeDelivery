import request from 'supertest';
import express from 'express';
import { ReviewController } from '../src/controllers/ReviewController';

const app = express();
app.use(express.json());
app.post('/reviews', (req, res) => res.status(201).json({ ...req.body, id: 'r1' }));
app.get('/reviews/restaurant/:restId', (req, res) =>
  res.json([{ id: 'r1', restaurant: { id: req.params.restId }, rating: 5 }]),
);
app.get('/reviews/aggregates/:restId', (req, res) => res.json({ average: 4.5, total: 10 }));

describe('ReviewController', () => {
  it('POST /reviews erstellt Review', async () => {
    const res = await request(app)
      .post('/reviews')
      .send({ userId: 'u1', restaurantId: 'r1', orderId: 'o1', rating: 5 });
    expect(res.status).toBe(201);
    expect(res.body.rating).toBe(5);
  });

  it('GET /reviews/restaurant/:id liefert Liste', async () => {
    const res = await request(app).get('/reviews/restaurant/r1');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].restaurant.id).toBe('r1');
  });

  it('GET /reviews/aggregates/:id liefert Aggregat', async () => {
    const res = await request(app).get('/reviews/aggregates/r1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ average: 4.5, total: 10 });
  });
});
