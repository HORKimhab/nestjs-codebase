import { Exclude } from 'class-transformer';
import { PermissionType } from 'src/module/auth/authentication/permission.type';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from './../../user-info/entities/user.info.entity';
import { BaseEntityColumns } from '@common/decorators';
import { UserRole } from '@common/enum';
import { genSalt, hash } from 'bcrypt';
import { BaseConstructor } from '../../../common/entities/base-constructor.entity';
import { SessoinEntity } from '@module/session/entities/session.entity';

@Entity('users')
@BaseEntityColumns()
export class User extends BaseConstructor<User> {
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
    nullable: true,
  })
  userName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: true,
  })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({})
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
    default: false,
  })
  isActivated: boolean;

  @Column({ type: 'timestamp', nullable: true })
  verifiedAt: Date;

  @OneToMany(() => UserInfo, (userInfo) => userInfo.user)
  userInfos: UserInfo[];

  @OneToMany(() => SessoinEntity, (session) => session.user)
  sessions: SessoinEntity[];

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      const salt = await genSalt();
      this.password = await hash(this.password, salt);
    }
  }

  // https://docs.nestjs.com/techniques/serialization#exclude-properties
  // constructor(partial?: Partial<User>) {
  //   if (partial) {
  //     Object.assign(this, partial);
  //   }
  // }
}
