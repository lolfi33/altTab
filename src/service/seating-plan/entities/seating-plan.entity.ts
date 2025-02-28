import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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
