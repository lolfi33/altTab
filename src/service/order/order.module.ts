import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { FacadesModule } from '../../facades/facades.module';
import { OrderItem } from './entities/orderItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), FacadesModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
