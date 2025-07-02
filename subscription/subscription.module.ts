import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';
import { SubscriptionProcessor } from './subscription.processor';
import { SubscriptionResolver } from './subscription.resolver';
import { WebhookController } from './webhook.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Subscription]),
    BullModule.registerQueue({ name: 'subscription-renew' }),
  ],
  providers: [SubscriptionService, SubscriptionProcessor, SubscriptionResolver],
  controllers: [WebhookController],
})
export class SubscriptionModule {}
