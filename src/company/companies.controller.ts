import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Company } from './company.entity';
import { CompaniesService } from './companies.service';
// import { CRUD_ROUTE } from 'src/crud.constant';

@Crud({
  model: {
    type: Company,
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
@Controller('companies')
export class CompaniesController implements CrudController<Company> {
  constructor(public service: CompaniesService) {}
}
