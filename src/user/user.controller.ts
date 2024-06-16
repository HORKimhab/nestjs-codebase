import { Permissions } from './../auth/authentication/decorators/permission.decorator';
import { Controller, Get, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ActiveUser } from 'src/auth/authentication/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/authentication/interfaces/active-user-data.interface';
import { Auth } from 'src/auth/authentication/decorators/auth.decorator';
import { UserRole } from './entities/user.entity';
import { Permission } from 'src/auth/authentication/permission.type';
import { Policies } from 'src/auth/authentication/decorators/policies.decorator';
import { FrameworkContributorPolicy } from '../auth/authentication/policies/framework-contributor.policy';
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

  @Auth(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
