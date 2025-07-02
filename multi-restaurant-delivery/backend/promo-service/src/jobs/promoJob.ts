import { Queue, Worker } from 'bullmq';
import { getRepository, LessThanOrEqual } from 'typeorm';
import Redis from 'ioredis';
import { Campaign } from '../entities/Campaign';

const connection = { host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) };
const queue = new Queue('promo', { connection });
queue.add('activate', {}, { repeat: { cron: '0 * * * *' } });

new Worker(
  'promo',
  async () => {
    const now = new Date();
    const active = await getRepository(Campaign).find({
      where: { active: false, startAt: LessThanOrEqual(now) },
    });
    const redis = new Redis(process.env.REDIS_URL!);
    for (const c of active) {
      if (c.rules.codes && Array.isArray(c.rules.codes)) {
        for (const code of c.rules.codes) {
          await redis.set(
            `promo:code:${code}`,
            c.id,
            'EX',
            Math.floor((c.endAt.getTime() - now.getTime()) / 1000),
          );
        }
      }
      c.active = true;
      await getRepository(Campaign).save(c);
    }
  },
  { connection },
);
