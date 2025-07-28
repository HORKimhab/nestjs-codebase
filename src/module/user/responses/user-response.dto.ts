import { User } from '@module/user/entities/user.entity';
import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserResponseDto extends PartialType(User) {
  @Exclude()
  password: string;
}
