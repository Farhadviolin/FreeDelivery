import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddPointsTransaction1680000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'points_transaction',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'userId', type: 'varchar' },
          { name: 'points', type: 'int' },
          { name: 'type', type: 'varchar' },
          { name: 'orderId', type: 'varchar', isNullable: true },
          { name: 'description', type: 'varchar', isNullable: true },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
          { name: 'updatedAt', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('points_transaction');
  }
}
