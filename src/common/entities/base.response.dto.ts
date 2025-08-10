import { IsInt, IsOptional, IsString } from 'class-validator';

export class BaseResponse {
  @IsInt()
  @IsOptional()
  statusCdoe?: number;

  @IsString()
  @IsOptional()
  timestamp?: string;

  @IsInt()
  @IsOptional()
  message?: string;
}
