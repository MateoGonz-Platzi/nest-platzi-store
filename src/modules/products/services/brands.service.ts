import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from './../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from './../dtos/brands.dtos';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Nike',
      description: 'Zapatillas Nike'
    }
  ];

   //Retorna todos
  findAll() {
    return this.brands;
  }
  //Retorna solo uno
  findOne(id: number) {
    const BRAND = this.brands.find((item) => item.id === id);
    if (!BRAND) {
      throw new NotFoundException(
        `ERROR_SERVICE: The brand ${id} does not exist`,
      );
    }
    return BRAND;
  }

  create(payload: CreateBrandDto) {
    console.log(payload);
    this.counterId += 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const BRAND = this.findOne(id);
    if (BRAND) {
      const index = this.brands.findIndex((item) => item.id === id);
      this.brands[index] = {
        ...BRAND,
        ...payload,
      };
      return this.brands[index];
    }
    return { message: 'ERROR_SERVICE: The id does not exist.' };
  }

  remove(id: number) {
    const BRAND = this.findOne(id);
    if (!BRAND) {
      throw new NotFoundException(
        `ERROR_SERVICE: The brand ${id} does not exist`,
      );
    } else {
      const temp = BRAND;
      this.brands = this.brands.filter((item) => item.id !== id);
      return { message: 'The brand is deleted', deleted: temp };
    }
  }
}
