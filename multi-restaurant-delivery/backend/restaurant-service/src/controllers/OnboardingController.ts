import { JsonController, Post, Body, HttpCode } from 'routing-controllers';
import { OnboardingService } from '../services/OnboardingService';
import { OnboardDto } from '../dtos/OnboardDto';

@JsonController('/restaurants')
export class OnboardingController {
  private svc = new OnboardingService();

  @Post('/onboard')
  @HttpCode(202)
  async onboard(@Body() dto: OnboardDto) {
    await this.svc.startOnboarding(dto);
    return { status: 'In Prüfung' };
  }
}
