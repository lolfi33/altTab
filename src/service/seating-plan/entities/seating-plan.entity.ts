import {
  Column,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableEntity } from '../../table/entities/table.entity';

export class SeatingPlan {
  @PrimaryColumn()
  restaurantId: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => TableEntity, (table) => table.number, {
    cascade: true,
    nullable: false,
  })
  tables: TableEntity[];

  @Column({ default: true })
  isActivated: boolean;
}
