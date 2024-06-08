import { Controller, Get, Param, Req } from '@nestjs/common';

import { UserService } from './user.service';
import { ActiveUser } from 'src/auth/authentication/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/authentication/interfaces/active-user-data.interface';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    // console.log('---user', user);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
