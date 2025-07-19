import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import { ApiKeyGuard } from './module/auth/authentication/gurads/api-key.guard';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Swagger');

  app.useStaticAssets(join(process.cwd(), 'public'), {
    // prefix: '/public/',
  });

  console.log('sdfsd', join(process.cwd(), 'public'));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Set global prefix first
  app.setGlobalPrefix('api');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalGuards(new ApiKeyGuard());

  // Setup Swagger documentation
  setupSwagger(app);

  await app.listen(3000);

  // ✅ Use Logger here
  logger.log('📄 Swagger docs available at: http://localhost:3000/api/docs');
  // API KEY
}
bootstrap();
