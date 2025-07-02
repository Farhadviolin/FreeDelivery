import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class TrackingGateway {
  @WebSocketServer() server: Server;
  broadcastLocation(driverId: string, coords: { lat: number; lon: number }) {
    this.server.emit(`driver-location:${driverId}`, coords);
  }
}
