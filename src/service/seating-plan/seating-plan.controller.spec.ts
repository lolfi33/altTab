import { Test, TestingModule } from '@nestjs/testing';
import { SeatingPlanController } from './seating-plan.controller';
import { SeatingPlanService } from './seating-plan.service';

describe('SeatingPlanController', () => {
  let controller: SeatingPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatingPlanController],
      providers: [SeatingPlanService],
    }).compile();

    controller = module.get<SeatingPlanController>(SeatingPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
