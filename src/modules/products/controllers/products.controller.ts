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
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/products.dtos';
import { MongoIdPipe } from './../../../common/mongo-id.pipe';
/* import { ParseIntPipe } from '../../../common/platzi-pipe/parse-int.pipe'; */

@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //ENDPOINT PARA VARIOS PRODUCTOS:
  @Get()
  @ApiOperation({ summary: 'List all products'})
  getProducts(@Query() params: FilterProductsDto) { 
    return this.productsService.findAll(params);
  }//RETORNAMOS TODOS LOS PRODUCTOS

  @Get('filter')
  getFilter() {
    return `Yo soy un filtro`;
  }

  //RETORNAR UN SOLO PRODUCTO
  @Get(':productId')
  @ApiOperation({ summary: 'List only product'})
  @HttpCode(HttpStatus.ACCEPTED) //f12 para ir a la definicion y entender como funcionan los estados personalizados de nest
  getOne(
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.productsService.findOne(productId);
  }

  @Post()
  @ApiOperation({ summary: 'Create product'})
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product'})
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product'})
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
