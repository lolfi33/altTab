import { Test, TestingModule } from '@nestjs/testing';
import { CarteService } from './carte.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Meal } from './entities/Meal';
import { BadRequestException, NotFoundException } from '@nestjs/common';
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
            getCarte: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CarteService>(CarteService);
    repository = module.get(getRepositoryToken(Meal));
  });

  it('should create a meal with sucess', async () => {
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

  it('should throw an error if the name already exists', async () => {
    repository.findOne.mockResolvedValue(mealEntity);
    const plat1: CreateMealDto = {
      name: 'Tarte aux pommes',
      description: 'Délicieuse tarte',
      type: MealType.DESSERT,
      price: 5.5,
    };
    await expect(service.create(plat1)).rejects.toThrow(BadRequestException);
  });

  it('should update the quantity of a meal', async () => {
    const updatedMeal = { ...mealEntity, quantity: 5 };

    repository.findOne.mockResolvedValue(mealEntity);
    repository.save.mockResolvedValue(updatedMeal);

    const result = await service.updateQuantity(1, 5);

    expect(result).toEqual(updatedMeal);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.save).toHaveBeenCalledWith({
      ...mealEntity,
      quantity: 5,
    });
  });

  it('should throw an error if the meal does not exist', async () => {
    repository.findOne.mockResolvedValue(null);

    await expect(service.updateQuantity(99, 5)).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 99 } });
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should return array of meals', async () => {
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

    expect(result).toEqual(meals);
    expect(result.length).toEqual(2);
  });

  it('doit récupérer uniquement les plats en quantité supérieure à zéro', async () => {
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

    repository.find = jest.fn().mockImplementation((options) => {
      if (options.where.quantity) {
        return meals.filter((meal) => meal.quantity > 0);
      }
      return meals;
    });
    const result = await service.getCarte();

    expect(repository.find).toHaveBeenCalledWith({
      where: { quantity: expect.anything() },
    });
    expect(result.length).toEqual(1);
  });
});
