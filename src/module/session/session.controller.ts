import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SessionService } from './session.service';
import { SessoinEntity } from './entities/session.entity';
import { CreateSessionDto } from './request/create-session.dto';
import { UpdateSessionDto } from './request/update-session.dto';

@Crud({
  model: {
    type: SessoinEntity,
  },
  query: {
    exclude: ['token', 'user.password'],
    join: {
      user: {
        eager: true,
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      // 'company.projects': {
      //   eager: true,
      // },
    },
  },
  dto: {
    create: CreateSessionDto,
    update: UpdateSessionDto,
  },
})
@Controller('session')
export class SessionController implements CrudController<SessoinEntity> {
  constructor(public service: SessionService) {}
}
