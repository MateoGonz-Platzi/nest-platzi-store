import { Module } from '@nestjs/common';
// Database
import { MongooseModule } from '@nestjs/mongoose';
//Controllers
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { BrandsController } from './controllers/brands.controller';
//services
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { Product, ProductSchema } from './entities/product.entity';
import { Brand, BrandSchema } from './entities/brand.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ], 
  controllers: [CategoriesController, ProductsController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService]
})
export class ProductsModule {}
