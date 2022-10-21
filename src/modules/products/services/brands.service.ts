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
  ) {}

  //Retorna todas las marcas
  findAll() {
    return this.brandRepo.find();
  }
  //Retorna solo una marca
  findOne(id: number) {
    const BRAND = this.brandRepo.findOneBy({id});
    if (!BRAND) {
      throw new NotFoundException(
        `ERROR_SERVICE: The brand ${id} does not exist`,
      );
    }
    return BRAND;
  }
  //Crea una marca
  create(payload: CreateBrandDto) {
    const newBrand = this.brandRepo.create(payload); 
    return this.brandRepo.save(newBrand);
  }
  //Actualizar una marca
  async update(id: number, payload: UpdateBrandDto) {
    const BRAND = await this.findOne(id);
    if (BRAND) {
      this.brandRepo.merge(BRAND, payload);
      return this.brandRepo.save(BRAND)
    }
    throw new NotFoundException(
      `ERROR_SERVICE: The brand ${id} does not exist`,
    );
  }
  //Eliminar una marca
  remove(id: number) {
    const BRAND = this.findOne(id);
    if (!BRAND) {
      throw new NotFoundException(
        `ERROR_SERVICE: The brand ${id} does not exist`,
      );
    } else {
      return this.brandRepo.delete(id);
    }
  }
}
