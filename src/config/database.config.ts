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
    //Fix: Entity metadata for User#userInfos was not found...
    entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
  };
};
