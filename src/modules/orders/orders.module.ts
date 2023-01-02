//Module settings
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//Controllers
import { OrderController } from '../orders/controllers/order.controller';
//Services
import { OrderService } from '../orders/services/order.service';
//Modules
import { UsersModule } from '../users/users.module';

import { OrderItem } from '../orders/entities/order-item.entity';
import { Order } from '../orders/entities/order.entity';
import { Customer } from '../users/entities/customer.entity';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';
import { Product } from '../products/entities/product.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    TypeOrmModule.forFeature([Order, OrderItem])
  ],
  controllers: [OrderController, OrderItemController],
  providers: [OrderService, OrderItemService],
})
export class OrdersModule { }