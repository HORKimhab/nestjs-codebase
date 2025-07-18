import { IsEmail, MinLength } from 'class-validator';

export class AuthRegisterDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
