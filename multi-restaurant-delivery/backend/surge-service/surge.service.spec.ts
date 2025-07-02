import { Test, TestingModule } from '@nestjs/testing';
import { SurgeService } from './surge.service';
describe('SurgeService', () => {
  let service: SurgeService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurgeService],
    }).compile();
    service = module.get<SurgeService>(SurgeService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
