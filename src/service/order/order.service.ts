import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrderDto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    //TODO vérifier si les plats sont disponibles et si la table est libre
    return this.orderRepository.save(createOrderDto);
  }
}
