import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderResponseDto } from './dto/orderResponse.dto';
import { Order } from "./entities/order.entity";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(201)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  async getOrder(@Param() id: string): Promise<Order> {
    return this.orderService.getOrder(id);
  }
}
