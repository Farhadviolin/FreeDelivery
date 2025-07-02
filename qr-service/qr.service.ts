import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './campaign.entity';
import { CreateCampaignDto } from './create-campaign.dto';
import { toDataURL } from 'qrcode';

@Injectable()
export class QrService {
  constructor(
    @InjectRepository(Campaign) private repo: Repository<Campaign>
  ) {}

  async createCampaign(dto: CreateCampaignDto) {
    const campaign = this.repo.create({ ...dto, createdAt: new Date() });
    await this.repo.save(campaign);
    return campaign;
  }

  async generateQr(link: string): Promise<string> {
    const qr = await toDataURL(link, { errorCorrectionLevel: 'H' });
    return qr; // Base64 PNG
  }
}
