import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyService } from '../src/loyalty.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PartnerConfig } from '../src/entities/partner.entity';

describe('LoyaltyService', () => {
  let service: LoyaltyService;
  let repo: any;

  beforeEach(async () => {
    repo = { findOneBy: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoyaltyService,
        { provide: getRepositoryToken(PartnerConfig), useValue: repo },
        { provide: 'LOYALTY_GRPC', useValue: { getService: jest.fn() } },
        { provide: 'KAFKA_SERVICE', useValue: {} },
        { provide: 'BULL_QUEUE', useValue: { add: jest.fn() } },
      ],
    }).compile();
    service = module.get<LoyaltyService>(LoyaltyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests for REST/gRPC flows, retry, error handling
});
