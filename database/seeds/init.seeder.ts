import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';
import userFactory from 'database/factories/user.factory';
import UserSeeder from './user.seeder';
import companyFactory from 'database/factories/company.factory';
import CompanySeeder from './company.seeder';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder, CompanySeeder],
      factories: [userFactory, companyFactory],
    });
  }
}
