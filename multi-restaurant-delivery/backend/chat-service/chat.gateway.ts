import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;
  handleMessage(client: Socket, payload: { to: string; msg: string }) {
    this.server.to(payload.to).emit('msg', payload.msg);
    // saveToDb(payload) // Implement DB save logic
  }
}
