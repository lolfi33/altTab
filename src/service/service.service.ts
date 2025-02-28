import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ServiceService {
  private activeTablePlan = {
    id: 1,
    tables: [
      { tableNumber: 1, seats: 4 },
      { tableNumber: 2, seats: 2 },
      { tableNumber: 3, seats: 6 },
    ],
  };

  createService() {
    if (!this.activeTablePlan) {
      throw new HttpException(
        'Aucun plan de table actif pour le restaurant.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const frozenTablePlan = { ...this.activeTablePlan };

    const openAt = new Date();
    const newService = {
      id: uuidv4(),
      openAt,
      tablePlan: frozenTablePlan,
    };

    return newService;
  }
}
