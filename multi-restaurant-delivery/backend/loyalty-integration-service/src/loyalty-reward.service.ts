import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedeemRecord } from './entities/redeem.entity';
import { LoyaltyService } from './loyalty.service';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { metrics } from './instrumentation';

const redeemCompleted = metrics.createCounter('redeem_points_completed_total', {
  description: 'Erfolgreiche Prämien-Einlösungen',
});
const redeemFailed = metrics.createCounter('redeem_points_failed_total', {
  description: 'Fehlgeschlagene Prämien-Einlösungen',
});

@Injectable()
export class LoyaltyRewardService {
  constructor(
    @InjectRepository(RedeemRecord) private repo: Repository<RedeemRecord>,
    private loyaltySvc: LoyaltyService,
    private queue: Queue,
    private redis: Redis,
  ) {}

  async listRewards(userId: string) {
    const balance = await this.loyaltySvc.getBalance(userId);
    // Beispiel: statische Liste, kann durch DB ersetzt werden
    const all = [
      { id: 'r1', name: '10% Rabatt', cost: 100 },
      { id: 'r2', name: 'Gratis Getränk', cost: 200 },
    ];
    return all.filter((r) => r.cost <= (balance?.points ?? 0));
  }

  async redeem(userId: string, rewardId: string, idempotencyKey: string) {
    if (await this.redis.get(idempotencyKey)) {
      return this.repo.findOneBy({ id: idempotencyKey });
    }
    const reward = (await this.listRewards(userId)).find((r) => r.id === rewardId);
    if (!reward) throw new BadRequestException('Nicht genug Punkte');
    const record = this.repo.create({
      id: idempotencyKey,
      userId,
      rewardId,
      pointsSpent: reward.cost,
    });
    await this.repo.save(record);
    try {
      await this.loyaltySvc.deductPoints({ userId, points: reward.cost, idempotencyKey });
      record.status = 'completed';
      await this.repo.save(record);
      redeemCompleted.add(1);
    } catch {
      record.status = 'pending';
      await this.repo.save(record);
      await this.queue.add(
        'redeem-points',
        { recordId: record.id },
        { attempts: 5, backoff: 60000 },
      );
      redeemFailed.add(1);
    }
    await this.redis.set(idempotencyKey, 'done', 'EX', 86400);
    return record;
  }
}
