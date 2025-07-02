import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import Stripe from 'stripe';
import { SubscriptionService } from './subscription.service';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly subscriptionService: SubscriptionService, private readonly stripe: Stripe) {}

  @Post('stripe')
  async handle(@Req() req: Request) {
    const sig = req.headers['stripe-signature'] as string;
    const event = this.stripe.webhooks.constructEvent(await (req as any).rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    await this.subscriptionService.handleWebhook(event);
    return '';
  }
}
