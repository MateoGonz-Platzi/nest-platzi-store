import { Module } from '@nestjs/common';
//Controllers
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { BrandsController } from './controllers/brands.controller';
//services
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';

@Module({
  controllers: [CategoriesController, ProductsController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService]
})
export class ProductsModule {}
