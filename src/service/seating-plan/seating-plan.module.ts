import { Module } from '@nestjs/common';
import { SeatingPlanService } from './seating-plan.service';
import { SeatingPlanController } from './seating-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatingPlan } from './entities/seating-plan.entity';
import { TableService } from '../table/table.service';
import { TableEntity } from '../table/entities/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeatingPlan, TableEntity])],
  controllers: [SeatingPlanController],
  providers: [SeatingPlanService, TableService],
})
export class SeatingPlanModule {}
