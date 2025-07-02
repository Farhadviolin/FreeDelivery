import { LoyaltyService } from '../src/LoyaltyService';
import { PointsTransaction, PointsTransactionType } from '../src/entities/PointsTransaction';

const mockRepo = {
  create: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: jest.fn(),
};

describe('LoyaltyService', () => {
  let service: LoyaltyService;
  beforeEach(() => {
    service = new LoyaltyService(mockRepo as any);
  });

  it('addPoints speichert Transaktion', async () => {
    mockRepo.create.mockReturnValue({ id: '1' });
    mockRepo.save.mockResolvedValue({ id: '1' });
    const tx = await service.addPoints('u1', 10, PointsTransactionType.EARN, 'o1', 'desc');
    expect(tx).toEqual({ id: '1' });
  });

  it('getBalance gibt 0 zurück, wenn keine Punkte', async () => {
    mockRepo.createQueryBuilder.mockReturnValue({
      select: () => ({ where: () => ({ getRawOne: async () => ({ sum: null }) }) }),
    });
    const bal = await service.getBalance('u1');
    expect(bal).toBe(0);
  });
});
