import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from  'mongoose';

import { Product } from './../entities/product.entity';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  // Constructor que instancia el modelo de producto y las funcionalidades de Mongo
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) { }
  //Mongo Retorna todos
  async findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};  // 👈  Implementamos FilterQuery de mongoose
      const limit = params.limit || 10; // 👈  Implementamos Una validación en la paginación 
      const offset = params.offset || 0;
      const { minPrice , maxPrice } = params;
      if (minPrice && maxPrice) { // 👈  Si existen los parametros precio minimo y máximo
        filters.price = { $gte: minPrice, $lte: maxPrice }; // 👈  Se añade el rango de precio en la consulta para Mongo
      }
      return await this.productModel
        .find(filters)
        .skip(offset)
        .limit(limit)
        .exec();  // 👈 Se obtiene la consulta
    }
    return await this.productModel.find().exec();
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

  async create(payload: CreateProductDto) {
    const newProduct = await new this.productModel(payload);
    return newProduct.save();
  }
  
  async update(id: string, payload: UpdateProductDto) {
    const PRODUCT = await this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!PRODUCT) {
      throw new NotFoundException(
        `ERROR_SERVICE: The product ${id} does not exist`,
      );
    }
    return PRODUCT;
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
