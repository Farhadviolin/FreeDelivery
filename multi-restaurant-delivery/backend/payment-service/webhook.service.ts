import { Controller, Post, Req } from '@nestjs/common';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

@Controller('webhook')
export class WebhookService {
  @Post('stripe')
  handleStripe(@Req() req: any) {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret!);
    if (event.type === 'payment_intent.succeeded') {
      // this.orderService.confirm(event.data.object.id);
    }
    return { received: true };
  }
}
