import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { pick } from 'lodash';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);

      return await this.usersRepository.save(user);
    } catch (err) {
      throw err;
    }
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
    const [accestToken, refershToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email },
      ),
      this.signToken(user, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return {
      accestToken,
      refershToken,
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

  async refreshToken(refershTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refershTokenDto.refershToken, {
        ...pick(this.jwtConfiguration, ['secret', 'audience', 'issuer']),
      });

      const user = await this.usersRepository.findOneByOrFail({
        id: sub,
      });

      return this.generateToken(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
