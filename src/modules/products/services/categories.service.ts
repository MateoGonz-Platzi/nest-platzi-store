import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/categories.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) { }

  //Retorna todos
  findAll() {
    return this.categoryRepo.find();
  }
  //Retorna solo uno
  findOne(id: number) {
    const CATEGORY = this.categoryRepo.findOneBy({ id });
    if (!CATEGORY) {
      throw new NotFoundException(
        `ERROR_SERVICE: The category ${id} does not exist`,
      );
    }
    return CATEGORY;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(payload);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const categoryUpdate = await this.findOne(id);
    if (categoryUpdate) {
      this.categoryRepo.merge(categoryUpdate, payload);
      return this.categoryRepo.save(categoryUpdate)
    }
    throw new NotFoundException(
      `ERROR_SERVICE: The category ${id} does not exist`,
    );
  }

  remove(id: number) {
    const categoryExists = this.findOne(id);
    if (!categoryExists) {
      throw new NotFoundException(
        `ERROR_SERVICE: The category ${id} does not exist`,
      );
    } else { return this.categoryRepo.delete(id); }
  }
}
