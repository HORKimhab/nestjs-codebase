import { Controller, Get, Param, Req } from '@nestjs/common';

import { UserService } from './user.service';
import { ActiveUser } from 'src/auth/authentication/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/authentication/interfaces/active-user-data.interface';
import { Auth } from 'src/auth/authentication/decorators/auth.decorator';
import { UserRole } from './entities/user.entity';
import { AuthType } from 'src/auth/authentication/enums/auth-type.enum';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(UserRole.EDITOR)
  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    return this.userService.findAll();
  }

  @Auth(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
