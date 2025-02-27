import { Body, Controller, Get, Post } from '@nestjs/common';
import { CarteService } from './carte.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { Meal } from './entities/Meal';

@Controller('meals')
export class CarteController {
  constructor(private readonly mealService: CarteService) {}

  @Get()
  async getAll(): Promise<Meal[]> {
    return this.mealService.getAll();
  }

  @Post()
  async create(@Body() createMealDto: CreateMealDto): Promise<Meal> {
    return this.mealService.create(createMealDto);
  }
}
