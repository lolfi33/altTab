import Meal from '../../../carte/entities/Meal';

export class CreateOrderDto {
  meals: Meal[];
  tableId: string;
}
