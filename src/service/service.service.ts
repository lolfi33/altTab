import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SeatingPlanService } from './seating-plan/seating-plan.service';

@Injectable()
export class ServiceService {
  constructor(private readonly seatingPlanService: SeatingPlanService) {}

  async createService() {
    const seatingPlan = await this.seatingPlanService.findActive();
    if (!seatingPlan) {
      throw new HttpException(
        'Aucun plan de table actif pour le restaurant.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const openAt = new Date();
    return {
      id: uuidv4(),
      openAt,
      tablePlan: seatingPlan,
    };
  }
}
