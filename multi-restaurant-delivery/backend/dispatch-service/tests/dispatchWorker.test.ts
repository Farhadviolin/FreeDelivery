import { handleDispatch } from '../src/workers/dispatchWorker';
import Redis from 'ioredis';
import { getRepository } from 'typeorm';
import amqp from 'amqplib';
import { Driver } from '../src/entities/Driver';
import { Order } from '../src/entities/Order';

jest.mock('ioredis');
jest.mock('typeorm');
jest.mock('amqplib');

const mockRedis = {
  smembers: jest.fn(),
  srem: jest.fn(),
  sadd: jest.fn(),
};
(Redis as any).mockImplementation(() => mockRedis);

const mockDriver = { id: 'driver1', lat: 48.2, lng: 16.4, name: 'Max', fcmToken: 'fcm123' };
const mockOrderRepo = { update: jest.fn() };
(getRepository as jest.Mock).mockImplementation((entity) => {
  if (entity === Driver) return { findOneBy: jest.fn().mockResolvedValue(mockDriver) };
  if (entity === Order) return mockOrderRepo;
});

const mockChannel = {
  assertExchange: jest.fn(),
  publish: jest.fn(),
  close: jest.fn(),
};
const mockConn = { createChannel: jest.fn().mockResolvedValue(mockChannel), close: jest.fn() };
(amqp.connect as jest.Mock).mockResolvedValue(mockConn);

describe('handleDispatch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRedis.smembers.mockResolvedValue(['driver1']);
  });

  it('assigns nearest driver and publishes event', async () => {
    await handleDispatch({ data: { orderId: 'order1', location: { lat: 48.21, lng: 16.37 } } });
    expect(mockOrderRepo.update).toHaveBeenCalledWith(
      'order1',
      expect.objectContaining({ driverId: 'driver1', status: 'ASSIGNED' }),
    );
    expect(mockRedis.srem).toHaveBeenCalledWith('drivers:available', 'driver1');
    expect(mockRedis.sadd).toHaveBeenCalledWith('drivers:busy', 'driver1');
    expect(mockChannel.publish).toHaveBeenCalledWith(
      'orders_exchange',
      'dispatch.assigned',
      expect.any(Buffer),
    );
  });

  it('throws if no driver available', async () => {
    mockRedis.smembers.mockResolvedValue([]);
    await expect(
      handleDispatch({ data: { orderId: 'order2', location: { lat: 48.21, lng: 16.37 } } }),
    ).rejects.toThrow('Kein verfügbarer Fahrer gefunden');
  });
});
