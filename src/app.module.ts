import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { TableModule } from './service/table/table.module';
import { SeatingPlanModule } from './service/seating-plan/seating-plan.module';
import { Meal } from './carte/entities/Meal';
import { CarteModule } from './carte/carte.module';
import { ServiceModule } from './service/service.module';
import { OrderModule } from './service/order/order.module';
import { ReviewModule } from './service/review/review.module';
import { FacadesModule } from './facades/facades.module';

@Module({
  imports: [
    TableModule,
    SeatingPlanModule,
    CarteModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
      logging: true,
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
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
