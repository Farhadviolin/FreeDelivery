import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGeofenceZone1680000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS postgis');
    await queryRunner.createTable(
      new Table({
        name: 'geofence_zone',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'name', type: 'varchar' },
          { name: 'area', type: 'geometry' },
          { name: 'metadata', type: 'jsonb', isNullable: true },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('geofence_zone');
  }
}
