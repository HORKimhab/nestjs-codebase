import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { BaseCommonEntity } from 'src/common/entities/base.common.entity';

@Entity('user-info')
export class UserInfo extends BaseCommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'ip', length: 45, nullable: true, default: null })
  ip: string;

  @Column('varchar', {
    name: 'hostname',
    length: 45,
    nullable: true,
    default: null,
  })
  hostname: string;

  @Column('varchar', {
    name: 'city',
    length: 100,
    nullable: true,
    default: null,
  })
  city: string;

  @Column('varchar', {
    name: 'region',
    length: 100,
    nullable: true,
    default: null,
  })
  region: string;

  @Column('varchar', {
    name: 'country',
    length: 100,
    nullable: true,
    default: null,
  })
  country: string;

  // loc
  @Column('varchar', {
    name: 'location',
    length: 100,
    nullable: true,
    default: null,
  })
  location: string;

  @Column('varchar', {
    name: 'postal',
    length: 100,
    nullable: true,
    default: null,
  })
  postal: string;

  @Column('varchar', {
    name: 'timezone',
    length: 100,
    nullable: true,
    default: null,
  })
  timezone: string;

  @ManyToOne(() => User, (user) => user.userInfos)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  user_id: string;
}
