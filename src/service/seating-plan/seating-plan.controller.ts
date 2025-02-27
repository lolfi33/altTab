import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SeatingPlanService } from './seating-plan.service';
import { CreateSeatingPlanDto } from './dto/create-seating-plan.dto';

@Controller('seating-plan')
export class SeatingPlanController {
  constructor(private readonly seatingPlanService: SeatingPlanService) {}

  @Post()
  create(@Body() createSeatingPlanDto: CreateSeatingPlanDto) {
    //TODO : A remplacer par l'id du restaurant
    return this.seatingPlanService.create(createSeatingPlanDto, '1');
  }

  @Get()
  findAll() {
    return this.seatingPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatingPlanService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatingPlanService.remove(id);
  }
}
