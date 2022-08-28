import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrdersService } from './../services/orders.service';
import { AddProductsToOrderDto, CreateOrderDto, UpdateOrderDto } from './../dtos/order.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.remove(id);
  }

  //----------------------------------------------------------------
  // # ADD / QUIT PRODUCT IN ORDER

  @Put(':id/products') // 👈 add product
  addProducts(
    @Param('id') id: string,
    @Body() payload: AddProductsToOrderDto,
  ) {
    return this.ordersService.addProducts(id, payload.productsIds);
  }

  @Delete(':id/product/:productId') // 👈 delete product
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.ordersService.removeProduct(id, productId);
  }

  /* @Put(':orderId/products') // 👈 add product
  addProducts(
    @Param('orderId', MongoIdPipe) id: string,
    @Body() payload: Array<ProductsToOrderDto>,
  ) {
    return this.ordersService.addProducts(id, payload);
  }

  @Delete(':orderId/product/:orderProductId') // 👈 delete product
  removeProduct(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Param('orderProductId', MongoIdPipe) orderProductId: string,
  ) {
    return this.ordersService.removeProduct(orderId, orderProductId);
  } */
}
