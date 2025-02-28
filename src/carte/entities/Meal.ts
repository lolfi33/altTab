import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { MealType } from '../interfaces/mealType';
import { Order } from '../../service/order/entities/order.entity';
@Entity()
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
  @Column()
  description: string;
  @Column()
  type: MealType;
  @Column({ default: 0 })
  quantity: number;
  @ManyToMany(() => Order, { cascade: true })
  orders: Order[];
}
export default Meal;
