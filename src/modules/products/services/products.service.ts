import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService {
  private logger = new Logger;
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private brandsService: BrandsService
  ) { }
  //Retorna todos
  findAll() {
    return this.productRepo.find({ relations: ['brand'] });
  }
  //Retorna solo uno
  async findOne(id: number) {
    const product = await this.productRepo.findOne({ relations: ['brand'], where: { id } });
    if (!product) {
      this.logger.error(`The product ${id} does not exist`);
      throw new NotFoundException(
        `ERROR_SERVICE: The product ${id} does not exist`,
      );
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);
    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId);
      newProduct.brand = brand;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const updateProduct = await this.findOne(id);
    const brand = await this.brandsService.findOne(payload.brandId);

    if (updateProduct && brand) {
      updateProduct.brand = brand;
      this.productRepo.merge(updateProduct, payload);
      this.logger.log(`Product ${id} updated successfully`);
      return this.productRepo.save(updateProduct);
    }
    if (!updateProduct) {
      this.logger.error(`The product ${id} does not exist`);
      throw new NotFoundException(`ERROR_SERVICE: The product ${id} does not exist`,)
    };
    if (!brand) {
      this.logger.error(`The brand ${payload.brandId} does not exist`);
      throw new NotFoundException(`ERROR_SERVICE: The brand ${payload.brandId} does not exist`,)
    };
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(
        `ERROR_SERVICE: The product ${id} does not exist`,
      );
    } else {
      return this.productRepo.delete(id);
    }
  }
}
