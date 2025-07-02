import { Controller, Get, Param, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private service: CurrencyService) {}
  @Get('rate/:code')
  getRate(@Param('code') code: string) {
    return this.service.getRate(code.toUpperCase());
  }
  @Get('convert')
  convert(@Query('amount') amount: number, @Query('to') to: string) {
    return this.service.convert(amount, to.toUpperCase());
  }
}
