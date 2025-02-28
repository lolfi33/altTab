import { SeatingPlanService } from './seating-plan/seating-plan.service';
import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatingPlan } from './seating-plan/entities/seating-plan.entity';
import { TableModule } from './table/table.module';

@Module({
  imports: [TypeOrmModule.forFeature([SeatingPlan]), TableModule],
  controllers: [ServiceController],
  providers: [ServiceService, SeatingPlanService],
})
export class ServiceModule {}
