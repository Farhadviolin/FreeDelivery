import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PartnerConfig } from './entities/partner.entity';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyService } from './loyalty.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PartnerConfig]),
    ClientsModule.registerAsync([
      {
        name: 'LOYALTY_GRPC',
        useFactory: async (configRepo) => {
          const cfg = await configRepo.findOne({ where: { name: 'PartnerA' } });
          return {
            transport: Transport.GRPC,
            options: {
              url: cfg?.endpoint || '',
              package: 'loyalty',
              protoPath: 'loyalty.proto',
            },
          };
        },
        inject: ['PartnerConfigRepository'],
      },
    ]),
  ],
  controllers: [LoyaltyController],
  providers: [LoyaltyService],
})
export class LoyaltyModule {}
