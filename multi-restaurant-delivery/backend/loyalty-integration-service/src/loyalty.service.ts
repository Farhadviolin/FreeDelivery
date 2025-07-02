import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnerConfig } from './entities/partner.entity';
import axios from 'axios';
import { ClientGrpc } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Queue } from 'bullmq';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class LoyaltyService {
  private restClient = axios.create();
  constructor(
    @InjectRepository(PartnerConfig) private repo: Repository<PartnerConfig>,
    @Inject('LOYALTY_GRPC') private grpcClient: ClientGrpc,
    @Inject('KAFKA_SERVICE') private kafka: any, // Replace with actual KafkaService
    @Inject('BULL_QUEUE') private queue: Queue,
  ) {}

  async awardPoints(order: any) {
    const cfg = await this.repo.findOneBy({ name: order.partner });
    if (cfg?.apiType === 'REST') {
      return this.callRest(cfg, order);
    } else if (cfg?.apiType === 'GRPC') {
      const client = this.grpcClient.getService<any>('Loyalty');
      return client.Award({ userId: order.userId, points: order.points }).toPromise();
    }
    throw new Error('No valid partner config');
  }

  private async callRest(cfg: PartnerConfig, order: any) {
    try {
      const res = await this.restClient.post(
        `${cfg.endpoint}/award`,
        {
          userId: order.userId,
          points: order.points,
        },
        { headers: this.authHeader(cfg) },
      );
      return res.data;
    } catch (err) {
      await this.queue.add(
        'award-points',
        { cfgId: cfg.id, order },
        { attempts: 5, backoff: 60000 },
      );
      throw err;
    }
  }

  private authHeader(cfg: PartnerConfig) {
    if (cfg.credentials?.token) {
      return { Authorization: `Bearer ${cfg.credentials.token}` };
    }
    return {};
  }

  @EventPattern('order.created')
  async handleOrderCreated(data: any) {
    await this.awardPoints(data);
  }
}
