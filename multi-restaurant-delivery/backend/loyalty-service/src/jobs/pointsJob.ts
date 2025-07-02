import { Queue, Worker } from 'bullmq';
import { getRepository } from 'typeorm';
import { PointsTransaction } from '../entities/PointsTransaction';

const connection = { host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) };
const queue = new Queue('loyalty-points', { connection });
queue.add('aggregate', {}, { repeat: { cron: '0 0 * * *' } }); // täglich

new Worker(
  'loyalty-points',
  async () => {
    // Beispiel: Bonuspunkte für Vielbesteller
    const repo = getRepository(PointsTransaction);
    const users = await repo
      .createQueryBuilder('pt')
      .select('pt.userId', 'userId')
      .addSelect('COUNT(*)', 'orders')
      .where('pt.type = :type', { type: 'EARN' })
      .groupBy('pt.userId')
      .getRawMany();
    for (const u of users) {
      if (Number(u.orders) >= 10) {
        await repo.save(
          repo.create({ userId: u.userId, points: 50, type: 'BONUS', description: 'Treue-Bonus' }),
        );
      }
    }
  },
  { connection },
);
