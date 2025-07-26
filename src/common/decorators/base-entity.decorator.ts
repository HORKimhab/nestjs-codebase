import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export function BaseEntityColumns(): ClassDecorator {
  return (target) => {
    CreateDateColumn({
      name: 'created_at',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      precision: 0,
    })(target.prototype, 'createdAt');

    UpdateDateColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
      precision: 0,
    })(target.prototype, 'updatedAt');

    DeleteDateColumn({
      name: 'deleted_at',
      type: 'timestamp',
      nullable: true,
      default: null,
      precision: 0,
    })(target.prototype, 'deletedAt');
  };
}
