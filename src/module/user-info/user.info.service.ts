import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserInfo } from './entities/user.info.entity';

@Injectable()
export class UserInfoService extends TypeOrmCrudService<UserInfo> {
  constructor(@InjectRepository(UserInfo) repo) {
    super(repo);
  }
}
