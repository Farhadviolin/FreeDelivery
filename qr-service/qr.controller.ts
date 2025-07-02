import { Controller, Post, Body } from '@nestjs/common';
import { QrService } from './qr.service';
import { CreateCampaignDto } from './create-campaign.dto';

@Controller('campaign')
export class QrController {
  constructor(private qrService: QrService) {}

  @Post('create')
  async create(@Body() dto: CreateCampaignDto) {
    const { id, url } = await this.qrService.createCampaign(dto);
    const qr = await this.qrService.generateQr(`${process.env.APP_URL}/r/${id}`);
    return { campaignId: id, qrImage: qr };
  }
}
