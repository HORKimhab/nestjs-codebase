import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  AllExceptionsFilter,
  TransformResponseInterceptor,
} from '@common/filters';
// import { ApiKeyGuard } from './module/auth/authentication/gurads/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);
  const logger = new Logger('Swagger');

  app.useStaticAssets(join(process.cwd(), 'public'));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Set global prefix first
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new AllExceptionsFilter()); // Register filter globally
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Interceptor
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // app.useGlobalGuards(new ApiKeyGuard());

  // Setup Swagger documentation
  setupSwagger(app);

  await app.listen(3000);

  // logger.log('🚀 Api project: http://localhost:3000');
  logger.log('📄 Swagger docs available at: http://localhost:3000/api/docs');

  // app.useLogger(new Logger());
}
bootstrap();
