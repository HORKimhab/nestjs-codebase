import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import { CreateUserDTO } from './request/create-user.dto';
// import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './request/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const [result, total] = await this.userRepository.findAndCount({
      order: { createdAt: 'DESC' },
    });

    return {
      data: result,
      count: total,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findIdentifier(data: LoginDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Email and Password is incorret.');
    }
    return user;
  }

  // async create(createUser: CreateUserDTO): Promise<User> {
  //   const salt = await bcrypt.genSalt(); // 10
  //   createUser.password = await bcrypt.hash(createUser.password, salt);
  //   const user = await this.userRepository.save(createUser);
  //   delete user.password;
  //   return user;
  // }
}
