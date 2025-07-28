import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication/gurads/authentication/authentication.guard';
import { AccessTokenGuard } from './authentication/gurads/access-token/access-token.guard';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage';
import { PermissionGuard } from './authentication/gurads/permissions.guard';
import { PolicyHandlerStorage } from './authentication/policies/policy-handler.storage';
import { FrameworkContributorPolicyHandler } from './authentication/policies/framework-contributor.policy';
import { PoliciesGuard } from './authentication/gurads/policies.guard';
import jwtConfig from 'src/config/jwt.config';
import { User } from '../user/entities/user.entity';
import { SessoinEntity } from '@module/session/entities/session.entity';
import { SessionModule } from '@module/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SessoinEntity]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    SessionModule,
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    // PolicyGuard
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    AccessTokenGuard,
    AuthenticationService,
    RefreshTokenIdsStorage,
    // Policy
    PolicyHandlerStorage,
    FrameworkContributorPolicyHandler,
  ],
  controllers: [AuthenticationController],
})
export class AuthModule {}
