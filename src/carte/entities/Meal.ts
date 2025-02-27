import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MealType } from '../interfaces/mealType';
@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;
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
}
export default Meal;
