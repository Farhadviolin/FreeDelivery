import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from '../inventory.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InventoryEntity } from '../entities/inventory.entity';

describe('InventoryService', () => {
  let service: InventoryService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: getRepositoryToken(InventoryEntity),
          useValue: { findOneBy: jest.fn(), create: jest.fn(), save: jest.fn() },
        },
        { provide: 'KAFKA', useValue: { emit: jest.fn() } },
        {
          provide: 'RedisService',
          useValue: { getClient: () => ({ get: jest.fn(), set: jest.fn() }) },
        },
      ],
    }).compile();
    service = module.get<InventoryService>(InventoryService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
