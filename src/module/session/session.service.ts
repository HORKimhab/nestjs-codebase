import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SessoinEntity } from './entities/session.entity';

@Injectable()
export class SessionService extends TypeOrmCrudService<SessoinEntity> {
  constructor(@InjectRepository(SessoinEntity) repo) {
    super(repo);
  }
}
