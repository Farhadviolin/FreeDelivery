import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyPoints } from './entities/loyalty-points.entity';

@Injectable()
export class LoyaltyService implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    @InjectRepository(LoyaltyPoints) private repo: Repository<LoyaltyPoints>,
  ) {}

  onModuleInit() {
    this.kafkaService.subscribe('order.completed', this.handleOrder.bind(this));
  }

  async handleOrder(payload) {
    const { userId, amount } = payload.value;
    const points = Math.floor(amount / 10);
    let record = await this.repo.findOne({ where: { userId } });
    if (!record) record = this.repo.create({ userId, points: 0 });
    record.points += points;
    await this.repo.save(record);
  }
}
