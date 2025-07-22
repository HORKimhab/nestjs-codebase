import { BaseCommonEntity } from 'src/common/entities/base.common.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('companies')
export class Company extends BaseCommonEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  // @CreateDateColumn({
  //   name: 'created_at',
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  //   precision: 0,
  // })
  // createdAt: Date;

  // @UpdateDateColumn({
  //   name: 'updated_at',
  //   type: 'datetime',
  //   default: () => 'CURRENT_TIMESTAMP',
  //   onUpdate: 'CURRENT_TIMESTAMP',
  //   precision: 0,
  // })
  // updatedAt: Date;

  // @DeleteDateColumn({
  //   name: 'deleted_at',
  //   type: 'datetime',
  //   nullable: true,
  //   default: null,
  //   precision: 0,
  // })
  // deletedAt: Date;
}
