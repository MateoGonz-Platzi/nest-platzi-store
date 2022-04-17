import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from  'mongoose';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  // Constructor que instancia el modelo de producto y las funcionalidades de Mongo
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) { }
  //Mongo Retorna todos
  findAll() {
    return this.productModel.find().exec();
  }
  //Mongo Retorna solo uno
  async findOne(id: string) {
    const PRODUCT = await this.productModel.findById(id).exec();
    if (!PRODUCT) {
      throw new NotFoundException(
        `ERROR_SERVICE: The product ${id} does not exist`,
      );
    }
    return PRODUCT;
  }

/*   create(payload: CreateProductDto) {
    console.log(payload);
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const PRODUCT = this.findOne(id);
    if (PRODUCT) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...PRODUCT,
        ...payload,
      };
      return this.products[index];
    }
    return { message: 'ERROR_SERVICE: The id does not exist.' };
  }

  remove(id: number) {
    const PRODUCT = this.findOne(id);
    if (!PRODUCT) {
      throw new NotFoundException(
        `ERROR_SERVICE: The product ${id} does not exist`,
      );
    } else {
      const temp = PRODUCT;
      this.products = this.products.filter((item) => item.id !== id);
      return { message: 'The product is deleted', deleted: temp };
    }
  } */
}
