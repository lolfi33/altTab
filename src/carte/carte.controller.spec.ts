import { Test, TestingModule } from '@nestjs/testing';
import { CarteController } from './carte.controller';
import Meal from './entities/Meal';
import { CarteService } from './carte.service';
import { MealType } from './interfaces/mealType';

describe('CarteController', () => {
  describe('PlatController', () => {
    let controller: CarteController;
    let service: CarteService;

    beforeEach(async () => {
      const mockService = {
        getAll: jest.fn(),
        ajouterPlat: jest.fn(),
      };

      const module: TestingModule = await Test.createTestingModule({
        controllers: [CarteController],
        providers: [
          {
            provide: CarteService,
            useValue: mockService,
          },
        ],
      }).compile();

      controller = module.get<CarteController>(CarteController);
      service = module.get<CarteService>(CarteService);
    });

    describe('getAll', () => {
      it('doit retourner un tableau de plats', async () => {
        const meals: Meal[] = [
          {
            id: 1,
            name: 'Tarte aux pommes',
            description: 'Délicieuse tarte',
            type: MealType.DESSERT,
            price: 5.5,
            quantity: 0,
          },
          {
            id: 2,
            name: 'Tarte aux cerises',
            description: 'Délicieuse tarte',
            type: MealType.DESSERT,
            price: 5,
            quantity: 2,
          },
        ];

        jest.spyOn(service, 'getAll').mockResolvedValue(meals);

        const result = await controller.getAll();

        expect(result).toEqual(meals);
        expect(result.length).toBe(2);
      });
    });
  });
});
