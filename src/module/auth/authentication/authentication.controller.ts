import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthRegisterDto } from './request/auth-register.dto';
import { SignInDto } from './request/sign-in.dto';
import { Request, Response } from 'express';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './request/refresh-token.dto';
import { spawn } from 'child_process';
import { join } from 'path';
import { runPythonScript } from '@common/utils';
import { User } from 'src/module/user/entities/user.entity';
import { UserResponseDto } from '../../user/responses/user-response.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { VerifyDto } from './request/verify.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  // @Post('user-info')
  // @Auth(AuthType.None)
  // async getUserInfo(@Body() clientInfo: any) {
  //   console.log('Received client info from Python:', clientInfo);
  //   return clientInfo;
  // }

  @Auth(AuthType.None)
  @Post('verify/email')
  async verifyEmail(@Body() dto: VerifyDto) {
    const accessToken = await this.authService.verifyEmail(dto);

    return accessToken;
  }

  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const accessToken = await this.authService.signIn(signInDto);

    return accessToken;
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict', // Prevent CSRF attacks
    });

    return { message: 'User logged out successfully' };
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
