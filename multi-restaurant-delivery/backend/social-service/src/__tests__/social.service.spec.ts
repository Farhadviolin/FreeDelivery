import { Test, TestingModule } from '@nestjs/testing';
import { SocialService } from '../social.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';

describe('SocialService', () => {
  let service: SocialService;
  let postRepo: any;
  let esClient: any;
  let redis: any;

  beforeEach(async () => {
    postRepo = {
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
      query: jest.fn(),
    };
    esClient = { index: jest.fn(), update: jest.fn() };
    redis = { lpush: jest.fn(), smembers: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialService,
        { provide: getRepositoryToken(Post), useValue: postRepo },
        { provide: 'ElasticsearchService', useValue: esClient },
        { provide: 'RedisService', useValue: redis },
      ],
    }).compile();
    service = module.get<SocialService>(SocialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should report a post', async () => {
    await service.reportPost('p1', 'u1', 'spam');
    expect(redis.lpush).toHaveBeenCalled();
  });

  it('should approve a post', async () => {
    await service.approvePost('p1');
    expect(postRepo.update).toHaveBeenCalledWith('p1', { status: 'approved' });
    expect(esClient.update).toHaveBeenCalled();
  });

  it('should block a post', async () => {
    await service.blockPost('p1');
    expect(postRepo.update).toHaveBeenCalledWith('p1', { status: 'blocked' });
    expect(esClient.update).toHaveBeenCalled();
  });

  it('should get badges', async () => {
    postRepo.count.mockResolvedValue(1);
    postRepo.query.mockResolvedValue([{ count: 10 }]);
    const badges = await service.getBadges('u1');
    expect(badges).toContain('first_post');
    expect(badges).toContain('top_reactor');
  });

  it('should get leaderboard', async () => {
    postRepo.query.mockResolvedValue([{ userId: 'u1', total: 5 }]);
    const leaderboard = await service.getLeaderboard();
    expect(leaderboard[0].userId).toBe('u1');
  });

  it('should get points', async () => {
    postRepo.count.mockResolvedValue(2);
    postRepo.query.mockResolvedValue([{ count: 3 }]);
    const points = await service.getPoints('u1');
    expect(points).toBe(2 * 10 + 3 * 2);
  });
});
