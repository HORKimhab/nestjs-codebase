import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SessionService } from './session.service';
import { SessoinEntity } from './entities/session.entity';

@Crud({
  model: { type: SessoinEntity },
  routes: {
    exclude: ['createManyBase'],
  },
})
@Controller('session')
export class SessionController implements CrudController<SessoinEntity> {
  constructor(public service: SessionService) {}
}
