import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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
    createMealDto.price = Math.round(createMealDto.price * 100) / 100;

    const meal = this.mealRepository.create(createMealDto);
    return this.mealRepository.save(meal);
  }

  async getAll(): Promise<Meal[]> {
    return this.mealRepository.find();
  }

  async updateQuantity(id: number, quantity: number): Promise<Meal> {
    const meal = await this.mealRepository.findOne({ where: { id } });
    if (!meal) {
      throw new NotFoundException("Le plat demandé n'existe pas.");
    }
    meal.quantity = quantity;
    return this.mealRepository.save(meal);
  }
}
