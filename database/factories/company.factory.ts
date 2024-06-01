import { Company } from './../../src/company/company.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Company, async (faker) => {
  const company = new Company();

  company.name = faker.company.name();

  return company;
});
