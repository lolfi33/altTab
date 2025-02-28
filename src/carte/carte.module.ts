import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/Meal';
import { CarteController } from './carte.controller';
import { CarteService } from './carte.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],
  controllers: [CarteController],
  providers: [CarteService],
  exports: [CarteService],
})
export class CarteModule {}
