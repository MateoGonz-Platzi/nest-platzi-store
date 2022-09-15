import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//MODULES: 
//Products:
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
//Controllers
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
//services
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Product]) ],
  controllers: [CategoriesController, ProductsController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService]
})
export class ProductsModule {}
