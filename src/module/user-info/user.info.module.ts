import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoController } from './user.info.controller';
import { UserInfo } from './entities/user.info.entity';
import { UserInfoService } from './user.info.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  providers: [UserInfoService],
  exports: [UserInfoService],
  controllers: [UserInfoController],
})
export class UserInfoModule {}
