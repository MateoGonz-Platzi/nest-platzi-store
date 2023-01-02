import { ApiTags } from '@nestjs/swagger';
import { OrderItemService } from './../services/order-item.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderItemDto } from '../dtos/order-item.dto';

@ApiTags('Order-item')
@Controller('order-item')
export class OrderItemController {
  constructor(private itemService: OrderItemService) { }

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemService.create(payload);
  }
}
