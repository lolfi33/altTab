import Meal from './entities/Meal';
import { Repository } from 'typeorm';

export class CarteRepository extends Repository<Meal> {
  async createMeal(meal: Meal): Promise<Meal> {
    return await this.save(meal);
  }
}
