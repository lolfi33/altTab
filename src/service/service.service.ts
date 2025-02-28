import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/Service';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const activeTablePlan = await this.getActiveTablePlan();
    if (!activeTablePlan) {
      throw new BadRequestException('Aucun plan de table actif.');
    }
    const newService = this.serviceRepository.create({
      ...createServiceDto,
      openAt: new Date(),
      tablePlan: activeTablePlan,
    });
    return this.serviceRepository.save(newService);
  }

  async getActiveTablePlan(): Promise<any> {
    return {
      tables: [
        { id: 1, seats: 4 },
        { id: 2, seats: 2 },
      ],
    };
  }
}
