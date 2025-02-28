import { Module } from '@nestjs/common';
import { SeatingPlanService } from './seating-plan.service';
import { SeatingPlanController } from './seating-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatingPlan } from './entities/seating-plan.entity';
import { TableModule } from '../table/table.module';

@Module({
  imports: [TableModule, TypeOrmModule.forFeature([SeatingPlan])],
  controllers: [SeatingPlanController],
  providers: [SeatingPlanService],
  exports: [SeatingPlanService],
})
export class SeatingPlanModule {}
