import {
  Body,
  Injectable,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import { CreateUserDTO } from './request/create-user.dto';
// import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './request/login.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Auth } from '@module/auth/authentication/decorators/auth.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from './responses/user-response.dto';
import { AuthRegisterDto } from '@module/auth/authentication/dto/auth-register.dto';
import { AuthType } from '@module/auth/authentication/enums/auth-type.enum';
import { omit } from 'lodash';
// @Injectable()
// export class UserInfoService extends TypeOrmCrudService<UserInfo> {
//   constructor(@InjectRepository(UserInfo) repo) {
//     super(repo);
//   }
// }

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) private userRepository) {
    super(userRepository);
  }

  async authRegisterEmail(dto: AuthRegisterDto): Promise<UserResponseDto> {
    try {
      const user = new User({
        ...dto,
      });

      const savedUser = await this.userRepository.save(user);

      return omit(savedUser, ['password', 'deletedAt']);
    } catch (err) {
      throw err;
    }
  }

  // async findAll() {
  //   const [result, total] = await this.userRepository.findAndCount({
  //     order: { createdAt: 'DESC' },
  //   });

  //   return {
  //     data: result,
  //     count: total,
  //   };
  // }

  // async findOne(id: string) {
  //   const user = await this.userRepository.findBy({ id });

  //   if (!user) {
  //     throw new NotFoundException();
  //   }

  //   return user;
  // }

  // async findIdentifier(data: LoginDTO): Promise<User> {
  //   const user = await this.userRepository.findOneBy({ email: data.email });
  //   if (!user) {
  //     throw new UnauthorizedException('Email and Password is incorret.');
  //   }
  //   return user;
  // }

  // async create(createUser: CreateUserDTO): Promise<User> {
  //   const salt = await bcrypt.genSalt(); // 10
  //   createUser.password = await bcrypt.hash(createUser.password, salt);
  //   const user = await this.userRepository.save(createUser);
  //   delete user.password;
  //   return user;
  // }
}
