import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  // Esta variable funciona como autoincrementador,
  // para simular una base de datos
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Tenis sb Stefan Janosky',
      description: 'Zapatos usados para skateboarding',
      price: 122,
      stock: 4,
      image: '',
    },
  ];
  //Retorna todos
  findAll() {
    return this.products;
  }
  //Retorna solo uno
  findOne(id: number) {
    const PRODUCT = this.products.find((item) => item.id === id);
    if (!PRODUCT) {
      throw new NotFoundException(
        `ERROR_SERVICE: The product ${id} does not exist`,
      );
    }
    return PRODUCT;
  }

  create(payload: CreateProductDto) {
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
  }
}
