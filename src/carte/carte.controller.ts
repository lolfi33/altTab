import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CarteService } from './carte.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { Meal } from './entities/Meal';

@Controller('meals')
export class CarteController {
  constructor(private readonly mealService: CarteService) {}

  @Post()
  async create(@Body() createMealDto: CreateMealDto): Promise<Meal> {
    return this.mealService.create(createMealDto);
  }

  @Get()
  async getAll(): Promise<Meal[]> {
    return this.mealService.getAll();
  }

  @Patch(':id/quantity')
  async updateQuantity(
    @Param('id') id: number,
    @Body('quantity') quantity: number,
  ): Promise<Meal> {
    return this.mealService.updateQuantity(id, quantity);
  }

  @Get('carte')
  async getCarte(): Promise<Meal[]> {
    return this.mealService.getCarte();
  }
}
