/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ActiveUser } from '../auth/authentication/decorators/active-user.decorator';
import { Auth } from '../auth/authentication/decorators/auth.decorator';
import { Policies } from '../auth/authentication/decorators/policies.decorator';
import { ActiveUserData } from '../auth/authentication/interfaces/active-user-data.interface';
import { FrameworkContributorPolicy } from '../auth/authentication/policies/framework-contributor.policy';
import { UserService } from './user.service';
import { Crud } from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './request/update-user.dto';
import { CreateUserDTO } from './request/create-user.dto';
import { UserResponseDto } from './responses/user-response.dto';
import { CrudController } from '@nestjsx/crud';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthRegisterDto } from '@module/auth/authentication/request/auth-register.dto';
import { AuthType } from '@module/auth/authentication/enums/auth-type.enum';

@Crud({
  model: {
    type: User,
  },
  // routes: {
  //   only: [
  //     'createOneBase',
  //     'getOneBase',
  //     'getManyBase',
  //     'updateOneBase',
  //     'deleteOneBase',
  //     'recoverOneBase'
  //   ],
  // },

  query: {
    exclude: ['password'],
    join: {
      sessions: {
        eager: true,
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      // 'company.projects': {
      //   eager: true,
      // },
    },
  },
  dto: {
    create: CreateUserDTO,
    update: UpdateUserDto,
    replace: UpdateUserDto,
  },
  serialize: {
    get: UserResponseDto,
    create: UserResponseDto,
    update: UserResponseDto,
    replace: UserResponseDto,
    delete: UserResponseDto,
    recover: UserResponseDto,
  },
})
@ApiTags('User')
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @Auth(AuthType.None)
  @Post('register-email')
  @ApiResponse({
    type: UserResponseDto,
    description: 'User info with access token',
  })
  async registerEmail(
    @Body() dto: AuthRegisterDto,
    @Req() req: Request,
  ): Promise<UserResponseDto> {
    // TODO
    const userAgent = req.get('user-agent');

    return await this.service.authRegisterEmail(dto);
  }
  // @Auth(UserRole.EDITOR)
  // @Permissions(Permission.Create)
  // @Policies(
  //   new FrameworkContributorPolicy(),
  //   /* new MinAgePolicy(18), new OnlyAdminPolicy() */
  // )
  // @Get()
  // findAll(@ActiveUser() user: ActiveUserData) {
  //   return this.userService.findAll();
  // }

  // @Auth(UserRole.ADMIN)
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
}
