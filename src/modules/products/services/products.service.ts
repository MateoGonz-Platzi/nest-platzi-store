import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  //Retorna todos
  findAll() {
    return this.productRepo.find();
  }
  //Retorna solo uno
  async findOne(id: number) {
    const PRODUCT = await this.productRepo.findOneBy({id});
    if (!PRODUCT) {
      throw new NotFoundException(
        `ERROR_SERVICE: The product ${id} does not exist`,
      );
    }
    return PRODUCT;
  }

  create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const PRODUCT = await this.findOne(id);
    if (PRODUCT) {
      this.productRepo.merge(PRODUCT, payload);
      return this.productRepo.save(PRODUCT);
    }
    throw new NotFoundException(
      `ERROR_SERVICE: The product ${id} does not exist`,
    );
  }

  async remove(id: number) {
    const PRODUCT = await this.findOne(id);
    if (!PRODUCT) {
      throw new NotFoundException(
        `ERROR_SERVICE: The product ${id} does not exist`,
      );
    } else {
      return this.productRepo.delete(id);
    }
  }
}
