import express from 'express';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import pg from 'pg';
import Redis from 'ioredis';

const app = express(), pool = new pg.Pool(), redis = new Redis();

app.get('/generate', async (req, res) => {
  const { campaign } = req.query;
  const ip = req.ip;
  const key = `qr:gen:${ip}:${new Date().toISOString().slice(0,10)}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 86400);
  if (count > 100) return res.status(429).send('Rate limit exceeded');
  const id = uuidv4();
  const url = `https://landing.delivery.com/?utm_campaign=${campaign}&utm_source=qr&utm_id=${id}`;
  await pool.query('INSERT INTO qr_codes(id,campaign,url) VALUES($1,$2,$3)', [id,campaign,url]);
  const svg = await QRCode.toString(url, { type: 'svg' });
  res.type('image/svg+xml').send(svg);
});
app.listen(4000);
export default app;
