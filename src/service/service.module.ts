import { SeatingPlanService } from './seating-plan/seating-plan.service';
import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, SeatingPlanService],
})
export class ServiceModule {}
