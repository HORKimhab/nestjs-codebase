import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';

// import postFactory from 'database/factories/post.factory';
// import companyFactory from 'database/factories/company.factory';
import userFactory from 'database/factories/user.factory';
// import PostSeeder from './post.seeder';
import UserSeeder from './user.seeder';
// import CompanySeeder from './company.seeder';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder],
      factories: [userFactory],
    });
  }
}
