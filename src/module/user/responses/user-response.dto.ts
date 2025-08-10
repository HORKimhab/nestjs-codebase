import { BaseResponse } from '@common/entities/base.response.dto';
import { User } from '@module/user/entities/user.entity';
import { IntersectionType, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserResponseDto extends IntersectionType(
  PartialType(User),
  BaseResponse,
) {
  @Exclude()
  password?: string;
}
