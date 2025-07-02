import { DataSource } from 'typeorm';
export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: ['./migrations/*.ts'],
  entities: ['./entities/*.ts'],
  synchronize: false,
  migrationsRun: false,
});
