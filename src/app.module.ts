import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CompaniesModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configDB } from './utils/config.db';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      ...configDB,
      retryAttempts: 10,
      retryDelay: 3000,
      entities: [__dirname + '/**/*.entity.ts'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    UserModule,
    CompaniesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
