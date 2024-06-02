import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';

import InitSeeder from '../seeds/init.seeder';
import { configDB } from 'src/utils/config.db';

const options = {
  ...configDB,
  entities: [__dirname + '/../../src/**/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../migrations/**/*.ts'],
  seeds: [InitSeeder],
};

export const source = new DataSource(
  options as DataSourceOptions & SeederOptions,
);
