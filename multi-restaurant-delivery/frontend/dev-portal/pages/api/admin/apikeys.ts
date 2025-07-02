import { getRepository } from 'typeorm';
import { ApiKey } from '../../db/entities/ApiKey';
import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { owner, quota } = req.body;
    const repo = getRepository(ApiKey);
    const key = uuidv4();
    const apiKey = repo.create({ key, owner, quota });
    await repo.save(apiKey);
    return res.status(201).json({ key });
  }
  if (req.method === 'GET') {
    const repo = getRepository(ApiKey);
    const keys = await repo.find();
    return res.status(200).json(keys);
  }
  res.status(405).end();
}
