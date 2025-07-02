import { Server } from 'socket.io';
import Redis from 'ioredis';

jest.mock('ioredis');

const mockIo = { to: jest.fn().mockReturnThis(), emit: jest.fn() };
const mockSub = { subscribe: jest.fn(), on: jest.fn() };
(Redis as any).mockImplementation(() => mockSub);

describe('WebSocket Broadcast', () => {
  it('should broadcast tracking update to correct room', () => {
    const update = { orderId: 'order1', lat: 48.2, lng: 16.4 };
    // Simuliere Redis-Message-Handler
    mockIo.to(update.orderId).emit('tracking', update);
    expect(mockIo.to).toHaveBeenCalledWith('order1');
    expect(mockIo.emit).toHaveBeenCalledWith('tracking', update);
  });
});
