import { BaseEntityColumns } from '@common/decorators';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('companies')
@BaseEntityColumns()
export class Company {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
