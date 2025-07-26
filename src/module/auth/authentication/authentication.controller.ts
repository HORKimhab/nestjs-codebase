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

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  // @Auth(AuthType.None)
  // @Post('register/email')
  // @ApiResponse({
  //   type: UserResponseDto,
  //   description: 'User info with access token',
  // })
  // async registerEmail(
  //   @Body() dto: AuthRegisterDto,
  //   @Req() req: Request,
  // ): Promise<UserResponseDto> {
  //   // TODO
  //   const userAgent = req.get('user-agent');

  //   // Run Python script with spawn
  //   // const requestUserFile = join(process.cwd(), 'scripts/request-user-info.py');
  //   // const pythonOutput = await runPythonScript(requestUserFile);
  //   // if (pythonOutput.success) {
  //   //   console.log('Python output:', pythonOutput.output);
  //   // } else {
  //   //   console.error('Python script failed:', pythonOutput.error);
  //   // }

  //   // TODO:
  //   // Event listener and other
  //   // Insert data to user & user-info
  //   // return;

  //   return this.authService.authRegisterEmail(dto);
  // }

  // @Post('user-info')
  // @Auth(AuthType.None)
  // async getUserInfo(@Body() clientInfo: any) {
  //   console.log('Received client info from Python:', clientInfo);
  //   return clientInfo;
  // }

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
