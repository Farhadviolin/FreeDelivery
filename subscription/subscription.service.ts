import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import Stripe from 'stripe';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription) private repo: Repository<Subscription>,
    private stripe: Stripe,
    @InjectQueue('subscription-renew') private renewQueue: Queue,
  ) {}

  async createSubscription(userId: string, priceId: string) {
    const customer = await this.stripe.customers.create({ metadata: { userId } });
    const sub = await this.stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });
    const entity = this.repo.create({
      userId,
      stripeSubscriptionId: sub.id,
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
    });
    await this.repo.save(entity);
    await this.scheduleRenewal(entity);
    return sub;
  }

  async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'invoice.paid':
      case 'customer.subscription.updated':
        const sub = event.data.object as Stripe.Subscription;
        await this.repo.update(
          { stripeSubscriptionId: sub.id },
          { currentPeriodEnd: new Date(sub.current_period_end * 1000), active: sub.status === 'active' }
        );
        break;
    }
  }

  async scheduleRenewal(entity: Subscription) {
    await this.renewQueue.add('renew', { subId: entity.id }, {
      delay: entity.currentPeriodEnd.getTime() - Date.now(),
    });
  }
}
