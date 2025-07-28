import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class VerifyDto {
  // October 31, 2008: Bitcoin whitepaper published
  @ApiProperty({ example: '311008' })
  @MaxLength(6)
  @IsString()
  @IsNotEmpty()
  verifyCode: string;
}
