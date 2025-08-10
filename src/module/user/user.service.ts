import {
  Body,
  Inject,
  Injectable,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDTO } from './request/login.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Auth } from '@module/auth/authentication/decorators/auth.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from './responses/user-response.dto';
import { AuthRegisterDto } from '@module/auth/authentication/request/auth-register.dto';
import { AuthType } from '@module/auth/authentication/enums/auth-type.enum';
import { omit, pick } from 'lodash';
import { SessoinEntity } from '../session/entities/session.entity';
import { randomSixCode } from '@common/utils/generate';
import { NodemailerService } from '@common/external/mail/mail.service';
import { ConfigType } from '@nestjs/config';
import appConfig from 'src/config/app.config';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) protected repo,
    private readonly dataSource: DataSource,
    @InjectRepository(SessoinEntity)
    private readonly sessionRepo: Repository<SessoinEntity>,
    private readonly nodeMailService: NodemailerService,

    @Inject(appConfig.KEY)
    private readonly configApp: ConfigType<typeof appConfig>,
  ) {
    super(repo);
  }

  async authRegisterEmail(dto: AuthRegisterDto): Promise<UserResponseDto> {
    const verifyCode = randomSixCode();

    try {
      const responseUser = await this.dataSource.transaction(
        async (manager) => {
          const userPayload = new User({ ...dto });
          const user = await manager.save(userPayload);
          const sessionPayload = new SessoinEntity({
            verifyCode,
            userId: user.id,
            expiredAt: new Date(
              Date.now() + this.configApp.codeExpirationTime * 60 * 1000,
            ),
          });

          await manager.save(sessionPayload);

          return user;
        },
      );

      // const mailContent = `
      // <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      //     <p>Dear ${dto.email},</p>
      //     <p>Thank you for registering with us.</p>
      //     <p>Your verification code is:</p>
      //     <p style="font-size: 16px; font-weight: bold; color: #000;">${verifyCode}</p>
      //     <p>Please enter this code to complete your registration process.</p>
      //     <p>If you did not request this, please disregard this message.</p>
      //     <p>
      //         Best regards,<br />
      //         The Support Team
      //     </p>
      // </div>`;

      // this.nodeMailService
      //   .sendEmail({
      //     sender: 'no-reply@yourapp.com',
      //     receiver: dto.email,
      //     subject: 'Verify your email',
      //     content: mailContent,
      //   })
      //   .catch((error) => {
      //     console.error(`Failed to send verification email:, ${error}`);
      //   });

      return {
        ...pick(responseUser, ['email', 'createdAt']),
        message:
          '👏 Thank you for registeration. Please verify email with verify code.',
      };
    } catch (error) {
      console.error('Failed to register user:', error);
      throw new Error(
        `Failed to register user. Please try again later. Error: ${error}`,
      );
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
