import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SessoinEntity } from '@module/session/entities/session.entity';
import { MailerModule } from '@common/external/mail/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, SessoinEntity]), MailerModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
