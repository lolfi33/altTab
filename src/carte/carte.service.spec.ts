import { Test, TestingModule } from '@nestjs/testing';
import { CarteService } from './carte.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Meal } from './entities/Meal';

describe('CarteService', () => {
  let service: CarteService;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarteService,
        {
          provide: getRepositoryToken(Meal),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CarteService>(CarteService);
    repository = module.get(getRepositoryToken(Meal));
  });

  describe('getAllPlats', () => {
    it('doit récupérer tous les plats', async () => {
      const meals = [
        {
          id: 1,
          name: 'Tarte aux pommes',
          description: 'Délicieuse tarte',
          type: 'Dessert',
          price: 5.5,
          quantity: 0,
        },
        {
          id: 2,
          name: 'Tarte aux cerises',
          description: 'Délicieuse tarte',
          type: 'Dessert',
          price: 5,
          quantity: 2,
        },
      ];

      repository.find = jest.fn().mockReturnValue(meals);

      const result = await service.getAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(meals);
      expect(result.length).toEqual(2);
    });
  });
});
