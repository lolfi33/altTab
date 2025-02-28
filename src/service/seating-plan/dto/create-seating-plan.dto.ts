import { TableEntity } from '../../table/entities/table.entity';

export class CreateSeatingPlanDto {
  restaurantId: string;
  id: string;
  tables: TableEntity[];
}
