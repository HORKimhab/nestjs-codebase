import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserInfoService } from './user.info.service';
import { UserInfo } from './entities/user.info.entity';

@Crud({
  model: {
    type: UserInfo,
  },
  routes: {
    only: [
      'createOneBase',
      'getOneBase',
      'getManyBase',
      'updateOneBase',
      'deleteOneBase',
    ],
  },
})
@Controller('user-info')
export class UserInfoController implements CrudController<UserInfo> {
  constructor(public service: UserInfoService) {}
}
