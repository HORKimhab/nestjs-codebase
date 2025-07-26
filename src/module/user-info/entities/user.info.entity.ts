import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/module/user/entities/user.entity';
import { BaseEntityColumns } from '@common/decorators';

// Sample data
//  {
//  "ip": "185.40.4.38",
//  "hostname": "tor-exit.lokodlare.com",
//  "city": "Oslo",
//  "region": "Oslo",
//  "country": "NO",
//  "loc": "59.9127,10.7461",
//  "org": "AS200195 Verasel, Inc.",
//  "postal": "0001",
//  "timezone": "Europe/Oslo",
//  "readme": "https://ipinfo.io/missingauth"
//  }

@Entity('user-info')
@BaseEntityColumns()
export class UserInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 45, nullable: true, default: null })
  publicIp: string;

  @Column('varchar', {
    length: 45,
    nullable: true,
    default: null,
  })
  deviceOs: string;

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

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.userInfos)
  @JoinColumn({ name: 'user_id' })
  user: User;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
