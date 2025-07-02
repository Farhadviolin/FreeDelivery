import { KafkaSubscribe } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@KafkaSubscribe({ topic: 'notifications', groupId: 'notifier' })
export class NotificationProcessor {
  constructor(private orchestrator: NotificationService) {}
  async handle(payload) {
    await this.orchestrator.dispatch(payload);
  }
}
