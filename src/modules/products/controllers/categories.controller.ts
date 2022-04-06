import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/categories.dtos'

@ApiTags('CAREGORIES')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(){
    return this.categoriesService.findAll();
  }
  
  @Get(':categoryId')
  getCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.findOne(categoryId);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  };

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(id, payload);
  };

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  };
}
