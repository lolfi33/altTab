import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { Meal } from './carte/entities/Meal';
import { CarteService } from './carte/carte.service';
import { CarteController } from './carte/carte.controller';
import { CarteModule } from './carte/carte.module';
@Module({
  imports: [
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
    CarteModule,
  ],
  controllers: [CarteController],
  providers: [CarteService],
})
export class AppModule {}
