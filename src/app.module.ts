import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { Meal } from './carte/entities/Meal';
import { Service } from './service/entities/Service';
import { CarteService } from './carte/carte.service';
import { CarteController } from './carte/carte.controller';
import { CarteModule } from './carte/carte.module';
import { ServiceController } from './service/service.controller';
import { ServiceService } from './service/service.service';
import { ServiceModule } from './service/service.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Meal, Service],
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forFeature([Meal]),
    TypeOrmModule.forFeature([Service]),
    CarteModule,
    ServiceModule,
  ],
  controllers: [CarteController, ServiceController],
  providers: [CarteService, ServiceService],
})
export class AppModule {}
