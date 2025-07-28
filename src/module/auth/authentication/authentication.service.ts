import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignInDto } from './request/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { RefreshTokenDto } from './request/refresh-token.dto';
import { pick } from 'lodash';
import {
  InvalidateRefreshTokenError,
  RefreshTokenIdsStorage,
} from './refresh-token-ids.storage';
import { randomUUID } from 'crypto';
import jwtConfig from 'src/config/jwt.config';
import { AuthRegisterDto } from './request/auth-register.dto';
import { User } from './../../user/entities/user.entity';
import { UserResponseDto } from '@module/user/responses/user-response.dto';
import { SessoinEntity } from '@module/session/entities/session.entity';
import { VerifyDto } from './request/verify.dto';
import { SessionService } from '@module/session/session.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(SessoinEntity)
    private readonly sessionRepository: Repository<SessoinEntity>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
  ) {}

  async verifyEmail(dto: VerifyDto) {
    const session = await this.sessionService.findOne({
      where: { ...dto },
      relations: ['user'],
      // select:
    });

    console.log({ session });

    // const user = await this.usersRepository.findOneBy({
    //   email: signInDto.email,
    // });

    // if (!user) {
    //   throw new UnauthorizedException('Email or password is incorrect.');
    // }

    // const isCorrectPassword = await this.hashingService.compare(
    //   signInDto.password,
    //   user.password,
    // );

    // if (!isCorrectPassword) {
    //   throw new UnauthorizedException('Email or password is incorrect.');
    // }

    // return await this.generateToken(user);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findOneBy({
      email: signInDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }

    const isCorrectPassword = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }

    return await this.generateToken(user);
  }

  async generateToken(user: User) {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.email,
          permissions: user.permissions,
        },
      ),
      this.signToken(user, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);
    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  private async signToken<T>(user: User, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: user.id,
        ...user,
        ...payload,
      },
      {
        ...pick(this.jwtConfiguration, ['secret', 'audience', 'issuer']),
        expiresIn,
      },
    );
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        ...pick(this.jwtConfiguration, ['secret', 'audience', 'issuer']),
      });

      const user = await this.usersRepository.findOneByOrFail({
        id: sub as unknown as string,
      });
      const isValid = await this.refreshTokenIdsStorage.validate(
        user.id,
        refreshTokenId,
      );

      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.id);
      } else {
        throw new Error('Refresh token is invalid');
      }
      return this.generateToken(user);
    } catch (err) {
      if (err instanceof InvalidateRefreshTokenError) {
        throw new UnauthorizedException('Access denied');
      }
      throw new UnauthorizedException();
    }
  }
}
