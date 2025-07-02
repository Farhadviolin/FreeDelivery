import { Gauge, collectDefaultMetrics } from 'prom-client';
import { getRepository } from 'typeorm';
import { ApiKey } from './db/entities/ApiKey';
import { NextApiRequest, NextApiResponse } from 'next';

const apiKeyUsageGauge = new Gauge({
  name: 'devportal_apikey_usage',
  help: 'API-Key Usage',
  labelNames: ['key', 'owner']
});

collectDefaultMetrics();

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const repo = getRepository(ApiKey);
  const keys = await repo.find();
  keys.forEach(k => {
    apiKeyUsageGauge.set({ key: k.key, owner: k.owner }, k.usage);
  });
  res.setHeader('Content-Type', 'text/plain');
  res.send(await import('prom-client').then(m => m.register.metrics()));
}
