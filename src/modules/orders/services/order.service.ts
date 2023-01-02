import { UpdateOrderDto } from '../dtos/order.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/modules/users/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>
  ) { }

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({ relations: ['items', 'items.product'], where: { id } });
    if (!order) {
      throw new NotFoundException(`ERROR_ORDER_SERVICE: The order ${id} does not exist`);
    }
    return order;
  }

  async create(payload: CreateOrderDto) {
    const newOrder = new Order();
    if (payload.customerId) {
      const customer = await this.customerRepo.findOneBy({ id: payload.customerId });
      newOrder.customer = customer;
    }
    return this.orderRepo.save(newOrder);
  }

  async update(id: number, payload: UpdateOrderDto) {
    const order = await this.findOne(id);
    if (payload.customerId) {
      const customer = await this.customerRepo.findOneBy({ id: payload.customerId });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    const order = this.findOne(id);
    if (!order) {
      throw new NotFoundException(`ERROR_ORDER_SERVICE: The order ${id} does not exist`);
    } else this.orderRepo.delete(id);
  }
}
