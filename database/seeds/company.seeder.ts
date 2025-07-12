import { Company } from 'src/module/company/company.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class CompanySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userFactory = factoryManager.get(Company);

    await userFactory.saveMany(7);

    dataSource.getRepository(Company);

    const companyRepository = factoryManager.get(Company);
    await companyRepository.saveMany(5);
  }
}
