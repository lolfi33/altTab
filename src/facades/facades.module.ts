import { Module } from '@nestjs/common';
import { RestaurantFacade } from './restaurant/restaurant.facade';

@Module({
  imports: [MealModule, TableModule],
  providers: [RestaurantFacade],
  exports: [RestaurantFacade],
})
export class FacadesModule {}
