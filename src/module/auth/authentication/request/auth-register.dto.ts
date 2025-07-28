import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class AuthRegisterDto {
  @ApiProperty({ example: 'user.bitcoin@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password$$1234' })
  @MinLength(8)
  password: string;
}
