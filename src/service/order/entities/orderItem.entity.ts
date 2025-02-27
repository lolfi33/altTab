import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Meal from '../../../carte/entities/Meal';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Meal)
  meal: Meal;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
