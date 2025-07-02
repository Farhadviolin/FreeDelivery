import { PromoService } from '../src/services/PromoService';
import { Campaign } from '../src/entities/Campaign';
import Redis from 'ioredis';

jest.mock('ioredis');
const mockRedis = {
  get: jest.fn(),
  set: jest.fn(),
};
(Redis as any).mockImplementation(() => mockRedis);

const mockRepo = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

jest.mock('typeorm', () => ({
  getRepository: () => mockRepo,
  LessThanOrEqual: (d: Date) => d,
  MoreThanOrEqual: (d: Date) => d,
}));

describe('PromoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('listActive gibt aktive Kampagnen zurück', async () => {
    mockRepo.find.mockResolvedValue([{ id: 'c1' }]);
    const res = await PromoService.listActive();
    expect(res).toEqual([{ id: 'c1' }]);
  });

  it('redeem wirft bei ungültigem Code', async () => {
    mockRedis.get.mockResolvedValue(null);
    await expect(PromoService.redeem('u1', 'code', 50)).rejects.toThrow('Invalid or expired code');
  });
});
