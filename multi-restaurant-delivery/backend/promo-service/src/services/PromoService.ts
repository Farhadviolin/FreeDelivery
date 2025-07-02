import Redis from 'ioredis';
import { getRepository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Campaign } from '../entities/Campaign';
import { Redemption } from '../entities/Redemption';

const redis = new Redis(process.env.REDIS_URL!);

export class PromoService {
  static async listActive() {
    const now = new Date();
    return getRepository(Campaign).find({
      where: { active: true, startAt: LessThanOrEqual(now), endAt: MoreThanOrEqual(now) },
    });
  }

  static async redeem(userId: string, code: string, amount: number) {
    const campaignId = await redis.get(`promo:code:${code}`);
    if (!campaignId) throw new Error('Invalid or expired code');
    const campaign = await getRepository(Campaign).findOne(campaignId);
    if (!campaign) throw new Error('Campaign not found');
    const { minAmount, discountPercent } = campaign.rules;
    if (amount < minAmount) throw new Error('Order amount too low');
    const discount = (amount * discountPercent) / 100;
    const red = getRepository(Redemption).create({
      userId,
      campaignId,
      code,
      redeemedAt: new Date(),
    });
    await getRepository(Redemption).save(red);
    await redis.set(`promo:used:${userId}:${code}`, '1', 'EX', 86400);
    return { discount };
  }
}
