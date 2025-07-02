import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddCampaignAndRedemption1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'campaign',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'name', type: 'varchar' },
          { name: 'rules', type: 'jsonb' },
          { name: 'startAt', type: 'timestamptz' },
          { name: 'endAt', type: 'timestamptz' },
          { name: 'active', type: 'boolean', default: true },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'redemption',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'userId', type: 'varchar' },
          { name: 'campaignId', type: 'uuid' },
          { name: 'code', type: 'varchar' },
          { name: 'redeemedAt', type: 'timestamptz' },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('redemption');
    await queryRunner.dropTable('campaign');
  }
}
