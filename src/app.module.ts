import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { TableModule } from './service/table/table.module';
import { SeatingPlanModule } from './service/seating-plan/seating-plan.module';

import { Meal } from './carte/entities/Meal';
import { CarteModule } from './carte/carte.module';

@Module({
  imports: [
    TableModule,
    SeatingPlanModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
