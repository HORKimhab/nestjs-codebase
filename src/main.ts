import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ApiKeyGuard } from './auth/authentication/gurads/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // API KEY 
  app.useGlobalGuards(new ApiKeyGuard());

  await app.listen(3000);
}
bootstrap();
