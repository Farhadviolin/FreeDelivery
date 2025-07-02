import express from 'express';
import { sendNotification } from './notification-producer.js';
import Redis from 'ioredis';
import { rateLimiter } from './rateLimiter.js';

const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL);

app.post('/notify', async (req, res) => {
  const { userId, channel, to, subject, body, pushToken, smsNumber } = req.body;
  if (!(await rateLimiter(redis, to))) return res.status(429).send('Rate limit exceeded');
  await sendNotification({ userId, channel, to, subject, body, pushToken, smsNumber });
  res.send('Notification queued');
});

app.listen(4000, () => console.log('Notification API running on 4000'));
