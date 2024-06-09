import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum';
import { UserRole } from 'src/user/entities/user.entity';

export const AUTH_TYPE_KEY = 'authType';
export const ROLES_KEY = 'roles';

export const Auth = (...args: (AuthType | UserRole)[]) => {
  const authTypes = args.filter((item) =>
    Object.values(AuthType).includes(item as AuthType),
  ) as AuthType[];
  const roles = args.filter((item) =>
    Object.values(UserRole).includes(item as UserRole),
  ) as UserRole[];

  // If no AuthType is provided, default to Bearer
  if (!authTypes.length) {
    authTypes.push(AuthType.Bearer);
  }

  return (target: any, key?: any, descriptor?: any) => {
    SetMetadata(AUTH_TYPE_KEY, authTypes)(target, key, descriptor);
    SetMetadata(ROLES_KEY, roles)(target, key, descriptor);
  };
};
