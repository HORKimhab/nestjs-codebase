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
import { spawn } from 'child_process';
import { join } from 'path';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Auth(AuthType.None)
  @Post('register/email')
  async registerEmail(@Body() dto: AuthRegisterDto, @Req() req: Request) {
    // TODO
    //    const ip = req.ip;
    const userAgent = req.get('user-agent');

    // Optionally parse device details from userAgent
    // You can use a library like 'ua-parser-js'
    const uaParser = new UAParser(userAgent);
    const device = uaParser.getResult();

    // Run Python script with spawn
    const requestUserFile = join(process.cwd(), 'scripts/request-user-info.py');
    const pythonProcess = spawn('python', [requestUserFile]);

    let stdoutData = '';
    let stderrData = '';

    // Collect stdout
    pythonProcess.stdout.on('data', (data) => {
      const text = data.toString();
      stdoutData += text;
      console.log('Python stdout:', text);
    });

    // Collect stderr
    pythonProcess.stderr.on('data', (data) => {
      const text = data.toString();
      stderrData += text;
      console.error('Python stderr:', text);
    });

    // Return a Promise to wait for Python to finish
    const pythonResult = await new Promise<{
      success: boolean;
      output: string;
      error?: string;
    }>((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        if (code === 0) {
          resolve({ success: true, output: stdoutData });
        } else {
          resolve({ success: false, output: stdoutData, error: stderrData });
        }
      });
    });

    // Log python result
    if (pythonResult.success) {
      console.log('Python script success output:', pythonResult.output);
    } else {
      console.error('Python script failed:', pythonResult.error);
    }

    // console.log({ req });

    // console.log('device', device);

    // TODO:
    // Event listener and other
    return;

    return this.authService.authRegisterEmail(dto);
  }

  @Post('user-info')
  @Auth(AuthType.None)
  async getUserInfo(@Body() clientInfo: any) {
    console.log('Received client info from Python:', clientInfo);
    // store, process, or log client info
    return { status: 'ok' };
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
