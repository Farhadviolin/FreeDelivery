import { Controller, Post, Body } from '@nestjs/common';
import Stripe from 'stripe';
import { Client as AdyenClient } from '@adyen/api-library';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });
const adyen = new AdyenClient({ apiKey: process.env.ADYEN_API_KEY });

@Controller('payment')
export class PaymentController {
  @Post('create-payment')
  async createPayment(@Body() dto: any) {
    if (dto.method === 'apple_pay') {
      return stripe.paymentIntents.create({
        amount: dto.amount,
        currency: dto.currency,
        payment_method_types: ['card', 'apple_pay'],
        // ...Apple Pay Setup
      });
    }
    // weitere Methoden (Google Pay, Adyen, etc.)
    return { status: 'not_implemented' };
  }
}
