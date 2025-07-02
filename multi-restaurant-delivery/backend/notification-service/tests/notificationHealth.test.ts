import request from 'supertest';
import express from 'express';
import NotificationController from '../src/controllers/NotificationController';

const app = express();
app.use(express.json());
app.use('/notifications', NotificationController);

describe('Notification Health Endpoint', () => {
  it('GET /notifications/health should return 200 and status ok', async () => {
    const res = await request(app).get('/notifications/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
