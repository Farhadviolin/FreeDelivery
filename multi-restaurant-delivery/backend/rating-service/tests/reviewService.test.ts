import { ReviewService } from '../src/services/ReviewService';
import Redis from 'ioredis';

jest.mock('ioredis');
const mockRepo = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  createQueryBuilder: jest.fn(),
};
const mockDS = { getRepository: () => mockRepo };

const mockRedis = { get: jest.fn(), set: jest.fn(), del: jest.fn() };
(Redis as any).mockImplementation(() => mockRedis);

const svc = new ReviewService();
svc['repo'] = mockRepo;
svc['cacheKey'] = (id: string) => `reviews:agg:${id}`;

const reviewDto = {
  userId: 'u1',
  restaurantId: 'r1',
  orderId: 'o1',
  rating: 5,
  comment: 'Top!',
};

describe('ReviewService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('createReview speichert Review und invalidiert Cache', async () => {
    mockRepo.create.mockReturnValue(reviewDto);
    mockRepo.save.mockResolvedValue(reviewDto);
    await svc.createReview(reviewDto);
    expect(mockRepo.create).toHaveBeenCalledWith(reviewDto);
    expect(mockRepo.save).toHaveBeenCalledWith(reviewDto);
    expect(mockRedis.del).toHaveBeenCalledWith('reviews:agg:r1');
  });

  it('getAggregates liefert Cache-Treffer', async () => {
    mockRedis.get.mockResolvedValue(JSON.stringify({ average: 4.5, total: 10 }));
    const result = await svc.getAggregates('r1');
    expect(result).toEqual({ average: 4.5, total: 10 });
  });

  it('getAggregates berechnet und cached bei Miss', async () => {
    mockRedis.get.mockResolvedValue(null);
    const qb = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([{ avg: '4.0', count: '2' }]),
    };
    mockRepo.createQueryBuilder = jest.fn(() => qb);
    const result = await svc.getAggregates('r1');
    expect(result).toEqual({ average: 4.0, total: 2 });
    expect(mockRedis.set).toHaveBeenCalledWith(
      'reviews:agg:r1',
      JSON.stringify({ average: 4.0, total: 2 }),
      'EX',
      3600,
    );
  });
});
