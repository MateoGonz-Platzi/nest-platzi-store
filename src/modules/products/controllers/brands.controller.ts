import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from './../dtos/brands.dtos';

@ApiTags('BRANDS')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}
  
  @Get()
  getBrands() {
    return this.brandService.findAll();
  };

  @Get(':brandId')
  getBrand(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandService.findOne(brandId);
  };
  
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  };

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBrandDto) {
    return this.brandService.update(id, payload);
  };

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.remove(id);
  };
}
