import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from '../currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        { provide: 'Redis', useValue: { get: jest.fn(), set: jest.fn() } },
      ],
    }).compile();
    service = module.get<CurrencyService>(CurrencyService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
