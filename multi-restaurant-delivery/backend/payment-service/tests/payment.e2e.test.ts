import request from 'supertest';
describe('Payment API', () => {
  it('should return 200 for health check', async () => {
    const res = await request('http://localhost:3000').get('/api/payment/health');
    expect(res.status).toBe(200);
  });
});
