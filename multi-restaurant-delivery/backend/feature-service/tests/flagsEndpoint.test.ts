import request from 'supertest';
import express from 'express';

const mockLdClient = {
  variation: jest.fn(),
};

jest.mock('launchdarkly-node-server-sdk', () => ({
  LaunchDarkly: {
    init: () => mockLdClient,
  },
}));

describe('Feature-Flag Endpoint', () => {
  let app;
  beforeAll(() => {
    app = express();
    app.get('/flags/:userKey', async (req, res) => {
      const user = { key: req.params.userKey };
      const flags = {
        newCheckoutFlow: await mockLdClient.variation('new-checkout-flow', user, false),
        menuSearchBeta: await mockLdClient.variation('menu-search-beta', user, false),
      };
      res.json(flags);
    });
  });

  it('liefert Flags für User', async () => {
    mockLdClient.variation.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    const res = await request(app).get('/flags/testuser');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ newCheckoutFlow: true, menuSearchBeta: false });
  });
});
