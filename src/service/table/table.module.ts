import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './entities/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TableEntity])],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
