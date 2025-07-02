import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { NotificationProcessor } from './notification.processor';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA',
        transport: Transport.KAFKA,
        options: {
          /*...*/
        },
      },
    ]),
  ],
  providers: [NotificationService, NotificationProcessor, WebsocketGateway],
})
export class NotificationModule {}
