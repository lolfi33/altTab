import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSeatingPlanDto } from './dto/create-seating-plan.dto';
import { SeatingPlan } from './entities/seating-plan.entity';
import { Repository } from 'typeorm';
import { TableService } from '../table/table.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TableEntity } from '../table/entities/table.entity';

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
    const tables: TableEntity[] = [];
    const seatingPlanToSave = new SeatingPlan();
    seatingPlanToSave.restaurantId = restaurantId;
    seatingPlanToSave.tables = '';
    for (const table of createSeatingPlanDto.tables) {
      const tableToAdd: TableEntity = await this.tableService.create(
        table,
        restaurantId,
      );
      this.verifyTableExistingInSeatingPlan(tables, tableToAdd.number);
      tables.push(tableToAdd);
    }
    seatingPlanToSave.tables = JSON.stringify(tables);
    const oldActiveSeatingPlan = await this.seatingPlanRepository.findOne({
      where: { isActivated: true },
    });
    if (oldActiveSeatingPlan) {
      await this.seatingPlanRepository.update(
        { id: oldActiveSeatingPlan.id },
        { isActivated: false },
      );
    }
    const seatingPlanRegistered =
      await this.seatingPlanRepository.save(seatingPlanToSave);
    return seatingPlanRegistered.id;
  }

  verifyTableExistingInSeatingPlan(
    addedTable: TableEntity[],
    tableNumber: number,
  ) {
    for (const table of addedTable) {
      if (table.number === tableNumber) {
        console.log('Table existe déjà.');
        throw new BadRequestException('Ce numéro de table existe déjà.');
      }
    }
  }

  findAll() {
    return this.seatingPlanRepository.find();
  }

  findOne(id: string) {
    return this.seatingPlanRepository.findOne({ where: { id: id } });
  }

  findActive() {
    return this.seatingPlanRepository.findOne({ where: { isActivated: true } });
  }

  remove(id: string) {
    return this.seatingPlanRepository.delete(id);
  }
}
