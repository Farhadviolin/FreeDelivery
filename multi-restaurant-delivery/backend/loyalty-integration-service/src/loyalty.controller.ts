import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyRewardService } from './loyalty-reward.service';
import { RedeemRewardDto } from './dto/redeem-reward.dto';

@Controller('loyalty')
export class LoyaltyController {
  constructor(
    private svc: LoyaltyService,
    private rewardSvc: LoyaltyRewardService,
  ) {}

  @Post('balance/:userId')
  async getBalance(@Param('userId') userId: string) {
    // Dummy implementation for now
    return { userId, balance: 0 };
  }

  @Get('rewards/:userId')
  async listRewards(@Param('userId') userId: string) {
    return this.rewardSvc.listRewards(userId);
  }

  @Post('rewards/redeem')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async redeemReward(@Body() dto: RedeemRewardDto) {
    return this.rewardSvc.redeem(dto.userId, dto.rewardId, dto.idempotencyKey);
  }
}
