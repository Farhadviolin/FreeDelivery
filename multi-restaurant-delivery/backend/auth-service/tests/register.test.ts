import request from 'supertest';
import app from '../src/index';

describe('POST /register', () => {
  it('should return 400 for invalid input', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'invalid', password: '123' });
    expect(res.statusCode).toBe(400);
  });
});
