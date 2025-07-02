import { getRepository } from 'typeorm';
import { ApiKey } from '../../../db/entities/ApiKey';
import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { id } = req.body;
  const repo = getRepository(ApiKey);
  const oldKey = await repo.findOne({ where: { id } });
  if (!oldKey) return res.status(404).json({ error: 'API key not found' });
  oldKey.quota = oldKey.quota - oldKey.usage; // Restquota übernehmen
  oldKey.usage = oldKey.quota; // altes Key-Objekt als "verbraucht" markieren
  await repo.save(oldKey);
  const newKey = repo.create({
    key: uuidv4(),
    owner: oldKey.owner,
    quota: oldKey.quota,
    usage: 0
  });
  await repo.save(newKey);
  return res.status(201).json({ newKey: newKey.key });
}
