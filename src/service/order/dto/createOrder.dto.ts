import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OrderItemDto {
  @IsString()
  mealId: string;

  @IsInt()
  quantity: number;

  @IsOptional()
  comment?: string;
}

export class CreateOrderDto {
  @IsInt()
  tableId: number;

  @IsArray()
  @ValidateNested()
  items: OrderItemDto[];
}
