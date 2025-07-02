import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { SocialModule } from '../social.module';

describe('Social GraphQL (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [SocialModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('should get feed', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ feed(userId: "u1", limit: 10) { id content } }' })
      .expect(200);
  });
});
