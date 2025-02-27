import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto, OrderItemDto } from './dto/createOrder.dto';
import { Order } from './entities/order.entity';
import { DataSource, QueryRunner } from 'typeorm';
import { OrderItem } from './entities/orderItem.entity';
import { RestaurantFacade } from '../../facades/restaurant/restaurant.facade';
import { OrderErrorItem, OrderResponseDto } from './dto/orderResponse.dto';
import Meal from '../../carte/entities/Meal';

@Injectable()
export class OrderService {
  constructor(
    private readonly restaurantFacade: RestaurantFacade,
    private readonly dataSource: DataSource,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const table = await this.validateTable(createOrderDto.tableId);

    const { mealMap, errorItems } = await this.validateDishAvailability(
      createOrderDto.items,
    );

    if (errorItems.length > 0) {
      return this.buildErrorResponse(errorItems);
    }

    return this.executeOrderTransaction(table, createOrderDto.items, mealMap);
  }

  private async validateTable(tableId: string): Promise<any> {
    const table = await this.restaurantFacade.getTable(tableId);
    if (!table) {
      throw new NotFoundException('Table non trouvée');
    }

    if (!(await this.restaurantFacade.checkTableOccupied(table.id))) {
      throw new BadRequestException(
        "La table n'est pas occupée par des clients",
      );
    }

    return table;
  }

  private async validateDishAvailability(
    items: OrderItemDto[],
  ): Promise<{ mealMap: Map<string, any>; errorItems: OrderErrorItem[] }> {
    const errorItems: OrderErrorItem[] = [];

    const mealIds: string[] = items.map((item) => item.mealId);
    const meals: Meal[] = await this.restaurantFacade.getMealsById(mealIds);

    const mealMap = new Map();
    meals.forEach((meal) => mealMap.set(meal.id, meal));

    for (const item of items) {
      const meal = mealMap.get(item.mealId);

      if (!meal) {
        throw new NotFoundException(
          `Plat avec l'ID ${item.mealId} introuvable`,
        );
      }

      if (meal.availableQuantity < item.quantity) {
        errorItems.push({
          mealId: meal.id,
          name: meal.name,
          requestedQuantity: item.quantity,
          availableQuantity: meal.availableQuantity,
        });
      }
    }

    return { mealMap, errorItems };
  }

  private buildErrorResponse(errorItems: OrderErrorItem[]): OrderResponseDto {
    return {
      success: false,
      errorItems,
      message: 'Quantité insuffisante pour certains plats',
    };
  }

  private async executeOrderTransaction(
    table: any,
    orderItems: OrderItemDto[],
    mealMap: Map<string, any>,
  ): Promise<OrderResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await this.createOrderEntity(queryRunner, table.id);
      await this.createOrderItems(queryRunner, order, orderItems, mealMap);
      await queryRunner.commitTransaction();

      return {
        success: true,
        orderId: order.id,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async createOrderEntity(
    queryRunner: QueryRunner,
    tableId: number,
  ): Promise<Order> {
    const order = new Order();
    const tableRepository = queryRunner.manager.getRepository(Table);
    order.table = tableRepository.create({ id: tableId });

    return queryRunner.manager.save(Order, order);
  }

  private async createOrderItems(
    queryRunner: QueryRunner,
    order: Order,
    items: OrderItemDto[],
    mealMap: Map<string, Meal>,
  ): Promise<void> {
    const mealRepository = queryRunner.manager.getRepository(Meal);

    for (const item of items) {
      const meal = mealMap.get(item.mealId);
      const orderItem = new OrderItem();
      orderItem.meal = mealRepository.create({ id: meal.id });

      orderItem.quantity = item.quantity;
      orderItem.comment = item.comment || null;
      orderItem.order = order;

      await queryRunner.manager.save(OrderItem, orderItem);
      await this.restaurantFacade.updateMealQuantity(
        meal.id,
        meal.quantity - item.quantity,
        queryRunner.manager,
      );
    }
  }
}
