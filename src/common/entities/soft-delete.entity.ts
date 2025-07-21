import { DeleteDateColumn } from 'typeorm';

export abstract class SoftDeleteEntity {
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'datetime',
    nullable: true,
    default: null,
    precision: 0,
  })
  deletedAt: Date;
}
