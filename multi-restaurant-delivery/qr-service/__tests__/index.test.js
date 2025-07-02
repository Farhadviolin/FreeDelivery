import request from 'supertest';
import app from '../index.js';

describe('QR API', () => {
  it('generates valid SVG and UTM URL', async () => {
    const res = await request(app).get('/generate?campaign=test');
    expect(res.status).toBe(200);
    expect(res.type).toBe('image/svg+xml');
    expect(res.text).toContain('svg');
    expect(res.text).toContain('utm_campaign=test');
  });
});
