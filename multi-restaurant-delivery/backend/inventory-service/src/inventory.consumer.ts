import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';

@Injectable()
export class InventoryConsumer {
  constructor(private service: InventoryService) {}

  @MessagePattern('order.created')
  async onOrderCreated(@Payload() payload) {
    await this.service.handleOrderCreated(payload.value);
  }

  @MessagePattern('order.cancelled')
  async onOrderCancelled(@Payload() payload) {
    await this.service.handleOrderCancelled(payload.value);
  }
}
