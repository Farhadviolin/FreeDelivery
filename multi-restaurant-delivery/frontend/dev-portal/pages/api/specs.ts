import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { apiCallCounter } from '../../metrics';
import { apiKeyMiddleware } from '../../middleware/apiKeyMiddleware';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  apiKeyMiddleware(_req, res, () => {
    apiCallCounter.inc({ endpoint: '/specs' });
    const spec = fs.readFileSync('openapi.yaml', 'utf-8');
    res.setHeader('Content-Type', 'application/x-yaml');
    res.send(spec);
  });
}
