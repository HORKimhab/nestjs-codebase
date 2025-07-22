import { Exclude } from 'class-transformer';
import { PermissionType } from 'src/module/auth/authentication/permission.type';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from './user.info.entity';
import { BaseCommonEntity } from 'src/common/entities/base.common.entity';
// import { PermissionType } from 'src/auth/authentication/permission.type';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
  USER = 'user', // normal user
}

@Entity('users')
export class User extends BaseCommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  lastName: string;

  @Index('IDX_USER_USERNAME')
  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 100,
  })
  userName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  avatar: string;

  @Index('IDX_USER_ROLE')
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'json',
    nullable: false,
    default: () => "'[]'",
  })
  permissions: PermissionType[];

  @Index('IDX_USER_IS_ACTIVATED')
  @Column({
    name: 'is_activated',
    type: 'boolean',
    default: true,
  })
  isActivated: boolean;

  @OneToMany(() => UserInfo, (userInfo) => userInfo.user)
  userInfos: UserInfo[];
}
