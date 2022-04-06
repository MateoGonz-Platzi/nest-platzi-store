import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Post()
  create(@Body() order: string) {
    return {
      message: 'Se ha creado una nueva orden',
      order,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}
