import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import { ApiKeyGuard } from './module/auth/authentication/gurads/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Swagger');

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

  app.useGlobalGuards(new ApiKeyGuard());

  // Setup Swagger documentation
  setupSwagger(app);

  await app.listen(3000);

  // ✅ Use Logger here
  logger.log('📄 Swagger docs available at: http://localhost:3000/api/docs');
  // API KEY
}
bootstrap();
