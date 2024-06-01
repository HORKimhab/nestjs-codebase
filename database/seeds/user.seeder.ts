import { hash } from 'bcrypt';
import { User, UserRole } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    const data = {
      firstName: 'admin',
      lastName: 'admin',
      userName: 'admin',
      email: 'admin.admin@gmail.com',
      password: await hash('password', 10),
      role: UserRole.ADMIN,
      isActivated: true,
    };

    const user = await repository.findOneBy({
      userName: data.userName,
    });

    // Insert only one record with this username.
    if (!user) {
      await repository.insert([data]);
    }

    const userFactory = await factoryManager.get(User);

    // Insert only one record.
    await userFactory.save();

    // Insert many records in database.
    await userFactory.saveMany(20);
  }
}
