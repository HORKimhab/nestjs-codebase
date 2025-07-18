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
import { AuthRegisterDto } from './dto/auth-register.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UAParser } from 'ua-parser-js';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Auth(AuthType.None)
  @Post('register')
  registerEmail(@Body() dto: AuthRegisterDto, @Req() req: Request) {
    // TODO
    //    const ip = req.ip;
    const userAgent = req.get('user-agent');

    // Optionally parse device details from userAgent
    // You can use a library like 'ua-parser-js'
    const uaParser = new UAParser(userAgent);
    const device = uaParser.getResult();

    console.log('device', device);

    return this.authService.authRegisterEmail(dto);
  }

  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const accessToken = await this.authService.signIn(signInDto);
    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });

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
