import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from './entities/Meal';
import { CreateMealDto } from './dto/create-meal.dto';

@Injectable()
export class CarteService {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
  ) {}

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const existingMeal = await this.mealRepository.findOne({
      where: { name: createMealDto.name },
    });
    if (existingMeal) {
      throw new BadRequestException('Un plat avec ce nom existe déjà.');
    }

    // Arrondi du prix au centime (si besoin, bien que le type "decimal" dans la BDD puisse s'en charger)
    createMealDto.price = Math.round(createMealDto.price * 100) / 100;

    // Si la quantité n'est pas fournie, on garde la valeur par défaut (0)
    if (typeof createMealDto.quantity === 'undefined') {
      createMealDto.quantity = 0;
    }

    const meal = this.mealRepository.create(createMealDto);
    return this.mealRepository.save(meal);
  }
}
