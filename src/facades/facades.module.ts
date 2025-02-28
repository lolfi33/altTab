import { Module } from '@nestjs/common';
import { RestaurantFacade } from './restaurant/restaurant.facade';
import { TableModule } from '../service/table/table.module';
import { CarteModule } from '../carte/carte.module';
import { SeatingPlanModule } from '../service/seating-plan/seating-plan.module';

@Module({
  imports: [CarteModule, TableModule, SeatingPlanModule],
  providers: [RestaurantFacade],
  exports: [RestaurantFacade],
})
export class FacadesModule {}
