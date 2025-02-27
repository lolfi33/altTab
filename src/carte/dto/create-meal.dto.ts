import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { MealType } from '../interfaces/mealType';

export class CreateMealDto {
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'La description est obligatoire.' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Le type de plat est obligatoire.' })
  @IsEnum(MealType, {
    message: `Le type doit être l'une des valeurs suivantes: Apéritif, Entrée, Plat principal, Dessert, Boisson.`,
  })
  type: MealType;

  @IsNotEmpty({ message: 'Le prix est obligatoire.' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Le prix doit être un nombre décimal arrondi au centime.' },
  )
  price: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
