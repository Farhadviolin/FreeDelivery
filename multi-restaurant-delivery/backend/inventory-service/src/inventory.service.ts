import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryEntity } from './entities/inventory.entity';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class InventoryService {
  private cache;
  constructor(
    @InjectRepository(InventoryEntity) private repo: Repository<InventoryEntity>,
    @Inject('KAFKA') private kafkaClient: ClientKafka,
    private redisService: RedisService,
  ) {
    this.cache = this.redisService.getClient();
  }

  async handleOrderCreated(evt: { productId: string; qty: number }) {
    const inv = await this.getOrCreate(evt.productId);
    if (inv.available < evt.qty) throw new Error('Insufficient stock');
    inv.available -= evt.qty;
    inv.reserved += evt.qty;
    await this.repo.save(inv);
    await this.cache.set(evt.productId, JSON.stringify(inv));
    await this.kafkaClient.emit('inventory.updated', inv);
  }

  async handleOrderCancelled(evt: { productId: string; qty: number }) {
    const inv = await this.getOrCreate(evt.productId);
    inv.available += evt.qty;
    inv.reserved -= evt.qty;
    await this.repo.save(inv);
    await this.cache.set(evt.productId, JSON.stringify(inv));
    await this.kafkaClient.emit('inventory.updated', inv);
  }

  async getOrCreate(productId: string) {
    let inv = await this.repo.findOneBy({ productId });
    if (!inv) {
      inv = this.repo.create({ productId, available: 0, reserved: 0 });
    }
    return inv;
  }

  async getInventory(productId: string) {
    const cached = await this.cache.get(productId);
    if (cached) return JSON.parse(cached);
    const inv = await this.getOrCreate(productId);
    await this.cache.set(productId, JSON.stringify(inv));
    return inv;
  }
}
