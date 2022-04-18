import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from './../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from './../dtos/brands.dtos';
@Injectable()
export class BrandsService {

  constructor(
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
  ) { }

  //Retorna todas las marcas
  async findAll() {
    return await this.brandModel.find().exec();
  }
  //Retorna solo uno
  async findOne(id: string) {
    const BRAND = await this.brandModel.findById(id).exec();
    if (!BRAND) {
      throw new NotFoundException(
        `ERROR_SERVICE: The brand ${id} does not exist`,
      );
    }
    return BRAND;
  }

  async create(payload: CreateBrandDto) {
    const newBrand = await new this.brandModel(payload);
    return newBrand.save();
  }

  async update(id: string, payload: UpdateBrandDto) {
    const BRAND = await this.brandModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
      if (!BRAND) {
        throw new NotFoundException(
          `ERROR_SERVICE: The brand ${id} does not exist`,
        );
      }
      return BRAND;
  }

  async remove(id: string) {
    return await this.brandModel.findByIdAndRemove(id);
  }
}
