import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto, OrderItemDto } from './dto/createOrder.dto';
import { Order } from './entities/order.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { OrderItem } from './entities/orderItem.entity';
import { RestaurantFacade } from '../../facades/restaurant/restaurant.facade';
import { OrderErrorItem, OrderResponseDto } from './dto/orderResponse.dto';
import Meal from '../../carte/entities/Meal';
import { TableEntity } from '../table/entities/table.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  constructor(
    private readonly restaurantFacade: RestaurantFacade,
    private readonly dataSource: DataSource,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
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

  private async validateTable(tableId: number): Promise<TableEntity> {
    const table: TableEntity = await this.restaurantFacade.getTable(tableId);
    if (!table) {
      throw new NotFoundException('Table non trouvée');
    }

    if (!(await this.restaurantFacade.checkTableOccupied(table.number))) {
      throw new BadRequestException(
        "La table n'est pas occupée par des clients",
      );
    }

    return table;
  }

  private async validateDishAvailability(
    items: OrderItemDto[],
  ): Promise<{ mealMap: Map<string, Meal>; errorItems: OrderErrorItem[] }> {
    const errorItems: OrderErrorItem[] = [];

    const mealIds: string[] = items.map((item: OrderItemDto) => item.mealId);
    const meals: Meal[] = await this.restaurantFacade.getMealsById(mealIds);

    const mealMap: Map<string, Meal> = new Map();
    meals.forEach((meal: Meal) => mealMap.set(meal.id, meal));

    for (const item of items) {
      const meal: Meal = mealMap.get(item.mealId);

      if (!meal) {
        throw new NotFoundException(
          `Plat avec l'ID ${item.mealId} introuvable`,
        );
      }

      if (meal.quantity < item.quantity) {
        errorItems.push({
          mealId: meal.id,
          name: meal.name,
          requestedQuantity: item.quantity,
          availableQuantity: meal.quantity,
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
    table: TableEntity,
    orderItems: OrderItemDto[],
    mealMap: Map<string, any>,
  ): Promise<OrderResponseDto> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order: Order = await this.createOrderEntity(
        queryRunner,
        table.number,
      );
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
    const order: Order = new Order();
    order.table = tableId;

    return queryRunner.manager.save(Order, order);
  }

  private async createOrderItems(
    queryRunner: QueryRunner,
    order: Order,
    items: OrderItemDto[],
    mealMap: Map<string, Meal>,
  ): Promise<void> {
    const mealRepository: Repository<Meal> =
      queryRunner.manager.getRepository(Meal);

    for (const item of items) {
      const meal: Meal = mealMap.get(item.mealId);
      const orderItem: OrderItem = new OrderItem();
      orderItem.meal = mealRepository.create({ id: meal.id });

      orderItem.quantity = item.quantity;
      orderItem.comment = item.comment || null;
      orderItem.order = order;

      await queryRunner.manager.save(OrderItem, orderItem);
      await this.restaurantFacade.updateMealQuantity(
        meal.id,
        meal.quantity - item.quantity,
      );
    }
  }

  async getOrder(id: string): Promise<Order> {
    return this.orderRepository.findOne({ where: { id } });
  }
}
