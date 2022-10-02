import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
/* import { ParseIntPipe } from '../../../common/platzi-pipe/parse-int.pipe'; */

@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //ENDPOINT PARA VARIOS PRODUCTOS:
  @Get()
  @ApiOperation({ summary: 'List all products'})
  getProducts(
    @Query('limit') limit = 100, //En caso de que no envién el limite
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) { return this.productsService.findAll(); } //RETORNAMOS EL METODO DEL 

  @Get('filter')
  getFilter() {
    return `Yo soy un filtro`;
  }

  //RETORNAR UN SOLO PRODUCTO
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED) //f12 para ir a la definicion y entender como funcionan los estados personalizados de nest
  getOne(
    /* @Res() response: Response, */
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}
