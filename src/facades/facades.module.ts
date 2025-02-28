import { Module } from '@nestjs/common';
import { RestaurantFacade } from './restaurant/restaurant.facade';
import { TableModule } from "../service/table/table.module";
import { CarteModule } from "../carte/carte.module";

@Module({
  imports: [CarteModule, TableModule],
  providers: [RestaurantFacade],
  exports: [RestaurantFacade],
})
export class FacadesModule {}
