import request from 'supertest';
import express from 'express';

const mockOpa = { check: jest.fn() };
jest.mock('@open-policy-agent/opa-http-client', () => ({
  OpaHttpClient: jest.fn(() => mockOpa),
}));

describe('Compliance-Service /compliance/check', () => {
  let app;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.post('/compliance/check', async (req, res) => {
      const input = { input: req.body };
      const result = await mockOpa.check(input);
      if (result.result === true) return res.sendStatus(200);
      return res.status(403).json({ error: 'Policy violation' });
    });
  });

  it('erlaubt Zugriff bei Policy-OK', async () => {
    mockOpa.check.mockResolvedValueOnce({ result: true });
    const res = await request(app)
      .post('/compliance/check')
      .send({ resource: 'orders', action: 'READ', user: { role: 'user' }, dataClass: 'public' });
    expect(res.status).toBe(200);
  });

  it('verweigert Zugriff bei Policy-Verstoß', async () => {
    mockOpa.check.mockResolvedValueOnce({ result: false });
    const res = await request(app)
      .post('/compliance/check')
      .send({ resource: 'orders', action: 'READ', user: { role: 'user' }, dataClass: 'PII' });
    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Policy violation');
  });
});
