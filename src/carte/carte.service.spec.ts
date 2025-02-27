import { Test, TestingModule } from '@nestjs/testing';
import { CarteService } from './carte.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Meal } from './entities/Meal';
import { BadRequestException } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealType } from './interfaces/mealType';

describe('CarteService', () => {
  let service: CarteService;
  let repository: any;

  const mealEntity = {
    id: 1,
    name: 'Tarte aux pommes',
    description: 'Délicieuse tarte',
    type: 'Dessert',
    price: 5.5,
    quantity: 0,
  };

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

  it('devrait créer un plat avec succès', async () => {
    repository.findOne.mockResolvedValue(null);
    repository.create.mockReturnValue(mealEntity);
    repository.save.mockResolvedValue(mealEntity);
    const plat1: CreateMealDto = {
      name: 'Tarte aux pommes',
      description: 'Délicieuse tarte',
      type: MealType.DESSERT,
      price: 5.5,
    };
    const result = await service.create(plat1);
    expect(result).toEqual(mealEntity);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { name: plat1.name },
    });
    expect(repository.create).toHaveBeenCalledWith({
      ...plat1,
    });
  });

  it('devrait lancer une erreur si le nom existe déjà', async () => {
    repository.findOne.mockResolvedValue(mealEntity);
    const plat1: CreateMealDto = {
      name: 'Tarte aux pommes',
      description: 'Délicieuse tarte',
      type: MealType.DESSERT,
      price: 5.5,
    };
    await expect(service.create(plat1)).rejects.toThrow(BadRequestException);
  });
});
