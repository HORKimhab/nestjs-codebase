/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param } from '@nestjs/common';
import { ActiveUser } from '../auth/authentication/decorators/active-user.decorator';
import { Auth } from '../auth/authentication/decorators/auth.decorator';
import { Policies } from '../auth/authentication/decorators/policies.decorator';
import { ActiveUserData } from '../auth/authentication/interfaces/active-user-data.interface';
import { FrameworkContributorPolicy } from '../auth/authentication/policies/framework-contributor.policy';
import { UserRole } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Auth(UserRole.EDITOR)
  // @Permissions(Permission.Create)
  @Policies(
    new FrameworkContributorPolicy(),
    /* new MinAgePolicy(18), new OnlyAdminPolicy() */
  )
  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    return this.userService.findAll();
  }

  // @Auth(UserRole.ADMIN)
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
}
