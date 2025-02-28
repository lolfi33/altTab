import {
  Column,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableEntity } from '../../table/entities/table.entity';

@Entity()
export class SeatingPlan {
  @PrimaryColumn()
  restaurantId: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  tables: string;

  @Column({ default: true })
  isActivated: boolean;
}
