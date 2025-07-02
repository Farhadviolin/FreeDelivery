import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './subscription.entity';

@Resolver()
export class SubscriptionResolver {
  constructor(private service: SubscriptionService) {}

  @Mutation(() => String)
  async subscribe(@Args('priceId') priceId: string, @Args('userId') userId: string) {
    const sub = await this.service.createSubscription(userId, priceId);
    return sub.latest_invoice.payment_intent.client_secret;
  }

  @Query(() => [Subscription])
  async subscriptions(@Args('userId') userId: string) {
    return this.service.getUserSubscriptions(userId);
  }
}
