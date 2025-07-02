import { Processor, Process } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Subscription } from './subscription.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionService } from './subscription.service';

@Processor('subscription-renew')
export class SubscriptionProcessor {
  constructor(
    @InjectRepository(Subscription) private repo: Repository<Subscription>,
    private subscriptionService: SubscriptionService,
  ) {}

  @Process('renew')
  async handleRenew(job: Job<{ subId: string }>) {
    const subs = await this.repo.findOneBy({ id: job.data.subId });
    if (!subs || !subs.active) return;
    // logic can notify user or handle retries
    await this.subscriptionService.scheduleRenewal(subs);
  }
}
