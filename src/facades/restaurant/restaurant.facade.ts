import { Injectable } from '@nestjs/common';
import Meal from '../../carte/entities/Meal';
import { CarteService } from '../../carte/carte.service';
import { TableService } from '../../service/table/table.service';
import { TableEntity } from "../../service/table/entities/table.entity";

@Injectable()
export class RestaurantFacade {
  constructor(
    private readonly mealService: CarteService,
    private readonly tableService: TableService,
  ) {}

  async getMeal(id: string): Promise<Meal> {
    const meals: Meal[] = await this.mealService.getAll();
    return meals.find((meal) => meal.id === id);
  }

  async getMealsById(ids: string[]): Promise<Meal[]> {
    const meals: Meal[] = [];
    for (const id of ids) {
      meals.push(await this.getMeal(id));
    }
    return meals;
  }

  async updateMealQuantity(id: string, newQuantity: number): Promise<Meal> {
    return this.mealService.updateQuantity(id, newQuantity);
  }

  async getTable(id: number): Promise<TableEntity> {
    return this.tableService.findOne(id);
  }

  async checkTableOccupied(id: number): Promise<boolean> {
    const table: TableEntity = await this.tableService.findOne(id);
    return table ? table.isOccupied : false;
  }

  async createTable(table: TableEntity): Promise<TableEntity> {
    return this.tableService.create(table, '1');
  }
}
