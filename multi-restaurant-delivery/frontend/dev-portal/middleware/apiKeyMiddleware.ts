import { getRepository } from 'typeorm';
import { ApiKey } from '../db/entities/ApiKey';
import { NextApiRequest, NextApiResponse } from 'next';

export async function apiKeyMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const apiKey = req.headers['x-api-key'] as string;
  if (!apiKey) return res.status(401).json({ error: 'API key required' });
  const repo = getRepository(ApiKey);
  const key = await repo.findOne({ where: { key: apiKey } });
  if (!key) return res.status(403).json({ error: 'Invalid API key' });
  if (key.usage >= key.quota) return res.status(429).json({ error: 'Quota exceeded' });
  key.usage += 1;
  await repo.save(key);
  next();
}
