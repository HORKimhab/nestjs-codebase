import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';
import InitSeeder from '../seeds/init.seeder';
import * as dotenv from 'dotenv';
dotenv.config();

const options = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + 'src/module/**/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: [__dirname + 'src/database/migrations/**/*.ts'],
  seeds: [InitSeeder],
};

export default new DataSource(options as DataSourceOptions & SeederOptions);
