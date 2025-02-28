import { CreateTableDto } from './create-table.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTableDto extends PartialType(CreateTableDto) {
  restaurantID: string;
}
