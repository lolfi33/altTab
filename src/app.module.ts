import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { Meal } from './entities/Meal';
import { TableModule } from './service/table/table.module';
import { SeatingPlanModule } from './service/seating-plan/seating-plan.module';

@Module({
  imports: [
    TableModule,
    SeatingPlanModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Meal],
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forFeature([Meal]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
