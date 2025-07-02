import { Resolver, Query, Args, Subscription, Root } from '@nestjs/graphql';
import { InventoryService } from './inventory.service';
import { InventoryEntity } from './entities/inventory.entity';

@Resolver(() => InventoryEntity)
export class InventoryResolver {
  constructor(private svc: InventoryService) {}

  @Query(() => InventoryEntity)
  inventory(@Args('productId') productId: string) {
    return this.svc.getInventory(productId);
  }

  @Subscription(() => InventoryEntity, {
    topics: 'inventory.updated',
  })
  inventoryUpdates(@Root() inv: InventoryEntity) {
    return inv;
  }
}
