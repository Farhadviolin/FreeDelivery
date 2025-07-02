import { Injectable } from '@nestjs/common';
@Injectable()
export class SurgeService {
  constructor(
    private redis: any,
    private db: any,
  ) {}
  async calculateRate(restaurantId: string) {
    const demand = await this.redis.zcount(`orders:${restaurantId}`, '-inf', '+inf');
    const baseFee = 3;
    const rate = baseFee * (1 + Math.log1p(demand) / 10);
    await this.db.query(`INSERT INTO surge_log(rate) VALUES($1)`, [rate]);
    await this.redis.set(`surge:${restaurantId}`, rate);
    return rate;
  }
}
