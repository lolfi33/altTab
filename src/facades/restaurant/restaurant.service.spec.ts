import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantFacade } from './restaurant.facade';

describe('RestaurantService', () => {
  let service: RestaurantFacade;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantFacade],
    }).compile();

    service = module.get<RestaurantFacade>(RestaurantFacade);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
