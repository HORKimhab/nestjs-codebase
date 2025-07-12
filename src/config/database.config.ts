import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const createTypeOrmOptions = (
  configService: ConfigService,
): DataSourceOptions => {
  const dbConfig = configService.get('app.database');

  return {
    ...dbConfig,
    retryAttempts: 10,
    retryDelay: 3000,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'], // relative to this file
    // autoLoadEntities: true,
    // synchronize: false,
  };
};
