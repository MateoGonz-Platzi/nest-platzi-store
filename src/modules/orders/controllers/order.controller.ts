import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { ParseIntPipe } from '../../../common/platzi-pipe/parse-int.pipe';
import { OrderService } from '../services/order.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) { }

  @Get()
  getOreders() {
    return this.orderService.findAll();
  }

  @Get(':orderId')
  getOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.findOne(orderId);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':orderId')
  update(@Param('orderId', ParseIntPipe) orderId: number, @Body() payload: UpdateOrderDto) {
    return this.orderService.update(orderId, payload);
  }

  @Delete(':orderId')
  delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.remove(orderId);
  }
}
