import { hash } from 'bcrypt';
import { setSeederFactory } from 'typeorm-extension';

import { User, UserRole } from 'src/user/entities/user.entity';

export default setSeederFactory(User, async (faker) => {
  const user = new User();

  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.userName = faker.person.fullName({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  user.email = faker.internet.email({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  user.password = await hash('password', 10);
  user.phone = faker.phone.number();
  user.avatar = faker.image.avatar();
  user.role = faker.helpers.arrayElement([
    UserRole.ADMIN,
    UserRole.EDITOR,
    UserRole.GHOST,
    UserRole.VIEWER,
  ]);
  user.isActivated = faker.datatype.boolean();

  return user;
});
