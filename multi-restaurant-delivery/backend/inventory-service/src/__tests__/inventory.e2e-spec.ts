import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InventoryModule } from '../inventory.module';

describe('Inventory GraphQL (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [InventoryModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('should get inventory', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ inventory(productId: "p1") { available reserved } }' })
      .expect(200);
  });
});
