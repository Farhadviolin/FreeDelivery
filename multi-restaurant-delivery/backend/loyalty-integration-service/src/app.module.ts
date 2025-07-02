import { BullModule } from '@nestjs/bullmq';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyService } from './loyalty.service';
import { PartnerConfig } from './entities/partner.entity';
import { RedeemRecord } from './entities/redeem.entity';
import { LoyaltyRewardService } from './loyalty-reward.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'loyalty',
      entities: [PartnerConfig, RedeemRecord],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PartnerConfig, RedeemRecord]),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'award-points' }),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          consumer: {
            groupId: 'loyalty-group',
          },
        },
      },
    ]),
  ],
  controllers: [LoyaltyController],
  providers: [LoyaltyService, LoyaltyRewardService],
})
export class AppModule {}
