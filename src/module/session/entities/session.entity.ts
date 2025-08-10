import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/module/user/entities/user.entity';
import { BaseEntityColumns } from '@common/decorators';
import { BaseConstructor } from '@common/entities/base-constructor.entity';
import { SessionStatus } from '@common/enum';

@Entity('session')
@BaseEntityColumns()
export class SessoinEntity extends BaseConstructor<SessoinEntity> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 6, nullable: true })
  verifyCode: string;

  @Column({
    type: 'enum',
    enum: SessionStatus,
    default: SessionStatus.Pending,
  })
  status: SessionStatus;

  @Column({ type: 'text', nullable: true })
  token: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string;

  @Column({ type: 'timestamp', nullable: true })
  expiredAt: Date;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
