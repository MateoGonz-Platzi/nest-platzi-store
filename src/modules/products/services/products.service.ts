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

  create(payload: CreateProductDto) {
    const newProduct = new this.productModel(payload);
    return newProduct.save();
  }
  
  update(id: string, payload: UpdateProductDto) {
    const PRODUCT = this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!PRODUCT) {
      throw new NotFoundException(
        `ERROR_SERVICE: The product ${id} does not exist`,
      );
    }

    return PRODUCT;
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
