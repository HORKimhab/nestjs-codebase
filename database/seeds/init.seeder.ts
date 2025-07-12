import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';
import UserSeeder from './user.seeder';
import CompanySeeder from './company.seeder';
import companyFactory from '../factories/company.factory';
import userFactory from '../factories/user.factory';

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
