import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from './../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from './../dtos/brands.dtos';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,
  ) { }

  //Retorna todas las marcas
  findAll() {
    return this.brandRepo.find();
  }
  //Retorna solo una marca
  findOne(id: number) {
    const brand = this.brandRepo.findOne({ relations: ['products'], where: { id } });
    if (!brand) {
      throw new NotFoundException(
        `ERROR_SERVICE: The brand ${id} does not exist`,
      );
    }
    console.log(brand);
    return brand;
  }
  //Crea una marca
  create(payload: CreateBrandDto) {
    const newBrand = this.brandRepo.create(payload);
    return this.brandRepo.save(newBrand);
  }
  //Actualizar una marca
  async update(id: number, payload: UpdateBrandDto) {
    const brand = await this.findOne(id);
    if (brand) {
      this.brandRepo.merge(brand, payload);
      return this.brandRepo.save(brand)
    }
    throw new NotFoundException(
      `ERROR_SERVICE: The brand ${id} does not exist`,
    );
  }
  //Eliminar una marca
  remove(id: number) {
    const brand = this.findOne(id);
    if (!brand) {
      throw new NotFoundException(
        `ERROR_SERVICE: The brand ${id} does not exist`,
      );
    } else {
      return this.brandRepo.delete(id);
    }
  }
}
