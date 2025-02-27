import { Injectable } from '@nestjs/common';
import { CreateSeatingPlanDto } from './dto/create-seating-plan.dto';
import { SeatingPlan } from './entities/seating-plan.entity';
import { Repository } from 'typeorm';
import { TableService } from '../table/table.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeatingPlanService {
  constructor(
    @InjectRepository(SeatingPlan)
    private seatingPlanRepository: Repository<SeatingPlan>,
    private tableService: TableService,
  ) {}

  async create(
    createSeatingPlanDto: CreateSeatingPlanDto,
    restaurantId: string,
  ) {
    const seatingPlanToSave = new SeatingPlan();
    for (const table of createSeatingPlanDto.tables) {
      const tableToAdd = await this.tableService.create(table, restaurantId);
      seatingPlanToSave.tables.push(tableToAdd);
    }

    await this.seatingPlanRepository.update(
      { isActivated: true },
      { isActivated: false },
    );
    await this.seatingPlanRepository.save(seatingPlanToSave);
  }

  findAll() {
    return this.seatingPlanRepository.find();
  }

  findOne(id: string) {
    return this.seatingPlanRepository.findOne({ where: { id: id } });
  }

  remove(id: string) {
    return this.seatingPlanRepository.delete(id);
  }
}
