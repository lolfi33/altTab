import { Injectable } from '@nestjs/common';
import Meal from '../../carte/entities/Meal';

@Injectable()
export class RestaurantFacade {
  constructor(
    private readonly mealService: MealService,
    private readonly tableService: TableService,
  ) {}

  // Méthodes façade pour les plats
  async getMeal(id: string) {
    return this.mealService.findOne(id);
  }

  async getMealsById(ids: string[]): Promise<Meal[]> {
    return this.mealService.findByIds(ids);
  }

  async updateMealQuantity(id: string, newQuantity: number, manager: unknown) {
    return this.mealService.updateQuantity(id, newQuantity);
  }

  async getTable(id: string) {
    return this.tablesService.findOne(id);
  }

  async checkTableOccupied(id: string) {
    const table = await this.tablesService.findOne(id);
    return table ? table.isOccupied : false;
  }
}
