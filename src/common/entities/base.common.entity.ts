import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SoftDeleteEntity } from './soft-delete.entity';

// TODO: https://chatgpt.com/c/687d636e-d270-800b-869b-208c9b089851
// Ignore folder src/common/entities
export abstract class BaseCommonEntity extends SoftDeleteEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  updatedAt: Date;
}
