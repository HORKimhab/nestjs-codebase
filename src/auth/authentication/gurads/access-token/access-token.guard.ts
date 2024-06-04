import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { REQUEST_USER_KEY } from 'src/auth/auth.constants';
import jwtConfig from 'src/auth/config/jwt.config';
import * as request from 'supertest';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService, 
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}


  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const request = context.switchToHttp().getRequest(); 
    const token = this.extractTokenFromHeader(request);
    if(!token) {
      throw new UnauthorizedException(); 
    }

    try { 
      const payload = await this.jwtService.verifyAsync(
        token, 
        this.jwtConfiguration,
      ); 
      request[REQUEST_USER_KEY] = payload; 
    } catch {
      throw new UnauthorizedException();
    }


    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? []; 
    return token;
  }
}
