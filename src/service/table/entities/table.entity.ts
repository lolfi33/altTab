import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tables')
export class TableEntity {
  @PrimaryColumn()
  number: number;

  @PrimaryColumn()
  restaurantId: string;

  @Column({ nullable: false })
  seats: number;

  @Column({ default: false })
  isOccupied: boolean;

  @Column({ default: 0 })
  numberOfOccupants: number;
}
