import { Worker } from 'bullmq';
import { getRepository } from 'typeorm';
import { PartnerConfig } from './entities/partner.entity';
import { LoyaltyService } from './loyalty.service';

const connection = {
  /* Redis connection config */
};
const configRepo = getRepository(PartnerConfig);
const loyaltyService = new LoyaltyService(/* ...inject dependencies... */);

const worker = new Worker(
  'award-points',
  async (job) => {
    const cfg = await configRepo.findOneBy({ id: job.data.cfgId });
    await loyaltyService.callRest(cfg, job.data.order);
  },
  { connection },
);
