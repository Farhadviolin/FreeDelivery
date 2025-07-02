import request from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());
app.post('/track/update', (req, res) => res.sendStatus(202));

describe('POST /track/update', () => {
  it('should return 202 for valid payload', async () => {
    const res = await request(app)
      .post('/track/update')
      .send({ orderId: 'order1', driverId: 'driver1', lat: 48.2, lng: 16.4 });
    expect(res.status).toBe(202);
  });
});
