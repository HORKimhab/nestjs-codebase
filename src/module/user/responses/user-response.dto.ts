import { User } from '@module/user/entities/user.entity';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UserResponseDto extends PartialType(
  OmitType(User, ['password', 'deletedAt']),
) {}
