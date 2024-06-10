import { RedisOptions } from 'ioredis/built/cluster/util';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

ConfigModule.forRoot({
  envFilePath: '.env',
});

export const configDB: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(String(process.env.DB_PORT), 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const configRedis: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(String(process.env.REDIS_PORT), 10) || 6379,
  password: process.env.REDIS_PASSWORD || '',
  retryAttempts: process.env.REDIS_RETRYATTEMPTS || '',
  database: process.env.REDIS_DB || 22,
};
