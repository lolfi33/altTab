import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTableDto: CreateTableDto) {
    //TODO : A remplacer par l'id du restaurant
    return this.tableService.create(createTableDto, '1');
  }

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}
