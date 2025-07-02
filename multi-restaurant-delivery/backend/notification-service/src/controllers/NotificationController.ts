import { JsonController, Get } from 'routing-controllers';

@JsonController('/notifications')
export class NotificationController {
  @Get('/health')
  health() {
    return { status: 'ok' };
  }
}
