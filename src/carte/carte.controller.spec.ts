import { Test, TestingModule } from '@nestjs/testing';
import { CarteController } from './carte.controller';
import { CarteService } from './carte.service';
import { MealType } from './interfaces/mealType';

describe('CarteController', () => {
  let controller: CarteController;
  let service: CarteService;

  const mealEntity = {
    id: 1,
    name: 'Tarte aux pommes',
    description: 'Délicieuse tarte',
    type: MealType.DESSERT,
    price: 5.5,
    quantity: 0,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarteController],
      providers: [
        {
          provide: CarteService,
          useValue: { create: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<CarteController>(CarteController);
    service = module.get<CarteService>(CarteService);
  });

  it('devrait créer un plat via le controller', async () => {
    const dto = {
      name: 'Tarte aux pommes',
      description: 'Délicieuse tarte',
      type: MealType.DESSERT,
      price: 5.5,
    };
    jest.spyOn(service, 'create').mockResolvedValue(mealEntity);
    const result = await controller.create(dto);
    expect(result).toEqual(mealEntity);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
