import { JsonController, Get, Post, Body } from 'routing-controllers';
import { PromoService } from '../services/PromoService';
import { RedeemDto } from '../dtos/RedeemDto';

@JsonController('/promotions')
export class PromoController {
  @Get('/')
  async list() {
    return PromoService.listActive();
  }

  @Post('/redeem')
  async redeem(@Body() dto: RedeemDto) {
    return PromoService.redeem(dto.userId, dto.code, dto.orderAmount);
  }
}
