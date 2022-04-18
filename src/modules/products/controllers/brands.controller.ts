import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from './../dtos/brands.dtos';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('BRANDS')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) { }

  @Get()
  @ApiOperation({ summary: 'List all brands' })
  getBrands() {
    return this.brandService.findAll();
  };

  @Get(':brandId')
  @ApiOperation({ summary: 'List only brand' })
  @HttpCode(HttpStatus.ACCEPTED)
  getBrand(@Param('brandId', MongoIdPipe) brandId: string) {
    return this.brandService.findOne(brandId);
  };

  @Post()
  @ApiOperation({ summary: 'Create brand' })
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  };

  @Put(':id')
  @ApiOperation({ summary: 'Update brand' })
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateBrandDto) {
    return this.brandService.update(id, payload);
  };

  @Delete(':id')
  @ApiOperation({ summary: 'Delete brand' })
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.brandService.remove(id);
  };
}
