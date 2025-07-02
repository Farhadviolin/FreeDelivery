import { Repository } from 'typeorm';
import { PointsTransaction, PointsTransactionType } from './entities/PointsTransaction';

export class LoyaltyService {
  constructor(private pointsRepo: Repository<PointsTransaction>) {}

  async addPoints(
    userId: string,
    points: number,
    type: PointsTransactionType,
    orderId?: string,
    description?: string,
  ) {
    const tx = this.pointsRepo.create({ userId, points, type, orderId, description });
    await this.pointsRepo.save(tx);
    return tx;
  }

  async getBalance(userId: string): Promise<number> {
    const { sum } = await this.pointsRepo
      .createQueryBuilder('pt')
      .select('SUM(pt.points)', 'sum')
      .where('pt.userId = :userId', { userId })
      .getRawOne();
    return Number(sum) || 0;
  }

  async getLeaderboard(limit = 10): Promise<{ userId: string; total: number }[]> {
    return this.pointsRepo
      .createQueryBuilder('pt')
      .select('pt.userId', 'userId')
      .addSelect('SUM(pt.points)', 'total')
      .groupBy('pt.userId')
      .orderBy('total', 'DESC')
      .limit(limit)
      .getRawMany();
  }
}
