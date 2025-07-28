import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(6)
  verifyCode: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
