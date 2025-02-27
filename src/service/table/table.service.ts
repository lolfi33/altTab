import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { TableEntity } from './entities/table.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(TableEntity)
    private tableRepository: Repository<TableEntity>,
  ) {}

  async create(
    createTableDto: CreateTableDto,
    restaurantId: string,
  ): Promise<TableEntity> {
    if (createTableDto.seats < 1) {
      throw new BadRequestException(
        'Le nombre de places doit être supérieur ou égal à 1.',
      );
    }
    const tableToSave = new TableEntity();
    tableToSave.restaurantId = restaurantId;
    tableToSave.number = createTableDto.number;
    tableToSave.seats = createTableDto.seats;

    try {
      return await this.tableRepository.save(tableToSave);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Ce numéro de table existe déjà.');
      } else {
        console.log("Erreur lors de l'ajout de la table. Erreur : " + error);
        throw new BadRequestException("Erreur lors de l'ajout de la table.");
      }
    }
  }

  findAll() {
    return this.tableRepository.find();
  }

  findOne(id: number) {
    return this.tableRepository.findOne({ where: { number: id } });
  }

  remove(id: number) {
    return this.tableRepository.delete(id);
  }
}
