import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/loyalty/balance/${userId}`, {
      headers: { Authorization: `Bearer ${req.cookies.token}` }
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Loyalty service unavailable' });
  }
}
