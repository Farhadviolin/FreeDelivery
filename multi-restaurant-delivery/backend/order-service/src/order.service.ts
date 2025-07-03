import { CurrencyService } from './currency.service';

export class OrderService {
  constructor(private readonly currencySvc: CurrencyService) {}

  async createOrder(priceBase: number, userRegionCurrency: string) {
    const { amount, currency } = await this.currencySvc.convert(priceBase, userRegionCurrency);
    // save order with localized price
    return { localizedPrice: amount, currency };
  }
}
