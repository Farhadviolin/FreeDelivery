import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InventoryEntity } from './entities/inventory.entity';
import { InventoryService } from './inventory.service';
import { InventoryConsumer } from './inventory.consumer';
import { InventoryResolver } from './inventory.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryEntity]),
    ClientsModule.register([
      {
        name: 'KAFKA',
        transport: Transport.KAFKA,
        options: { brokers: ['kafka:9092'] },
      },
    ]),
  ],
  providers: [InventoryService, InventoryConsumer],
  controllers: [InventoryResolver],
})
export class InventoryModule {}
