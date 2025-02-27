import { Test, TestingModule } from '@nestjs/testing';
import { CarteController } from './carte.controller';
import { CarteService } from './carte.service';
import { MealType } from './interfaces/mealType';
import Meal from './entities/Meal';

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
    const mockService = {
      getAll: jest.fn(),
      ajouterPlat: jest.fn(),
      create: jest.fn(),
      updateQuantity: jest.fn(),
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

  it('should create a meal with the controller', async () => {
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

  it('should change the quantity of the Tarte aux pommes from 0 to 5', async () => {
    const updatedMeal = { ...mealEntity, quantity: 5 };
    jest.spyOn(service, 'updateQuantity').mockResolvedValue(updatedMeal);

    const result = await controller.updateQuantity(1, 5);

    expect(result).toEqual(updatedMeal);
    expect(service.updateQuantity).toHaveBeenCalledWith(1, 5);
  });

  it('should return array of meals', async () => {
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

  it('should only return meals still in stock', async () => {
    const meals = [
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
    const carte = meals.filter((meal) => meal.quantity > 0);
    service.getCarte = jest.fn().mockResolvedValue(carte);
    const result = await controller.getCarte();

    expect(result.length).toBe(1);
  });
});
