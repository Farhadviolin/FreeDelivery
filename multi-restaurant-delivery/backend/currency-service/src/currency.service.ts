import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CurrencyService {
  private redis = new Redis(process.env.REDIS_URL!);
  async getRates(): Promise<Record<string, number>> {
    const raw = await this.redis.get('exchange_rates');
    return raw ? JSON.parse(raw) : {};
  }
  async getRate(code: string): Promise<number> {
    const rates = await this.getRates();
    return rates[code] || 1;
  }
  async convert(amount: number, to: string): Promise<{ amount: number; currency: string }> {
    const rate = await this.getRate(to);
    return { amount: amount * rate, currency: to };
  }
}
