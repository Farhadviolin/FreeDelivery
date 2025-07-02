import { MigrationInterface, QueryRunner } from 'typeorm';
export class CreateUsersOrders1688136000000 implements MigrationInterface {
  public async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE "user" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        "passwordHash" TEXT NOT NULL,
        roles TEXT[] NOT NULL DEFAULT ARRAY['customer']
      );
    `);
    await q.query(`
      CREATE TABLE "order" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" UUID REFERENCES "user"(id),
        status TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
  }
  public async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE "order";`);
    await q.query(`DROP TABLE "user";`);
  }
}
