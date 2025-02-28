import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { TableModule } from './service/table/table.module';
import { SeatingPlanModule } from './service/seating-plan/seating-plan.module';

import { Meal } from './carte/entities/Meal';
import { CarteModule } from './carte/carte.module';
import { OrderModule } from './restaurant/order/order.module';
import { ReviewModule } from './restaurant/review/review.module';
import { FacadesModule } from './facades/facades.module';
@Module({
  imports: [
    TableModule,
    SeatingPlanModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Meal],
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forFeature([Meal]),
    CarteModule,
    OrderModule,
    ReviewModule,
    FacadesModule,
  ],
  controllers: [CarteController],
  providers: [CarteService],
})
export class AppModule {}
