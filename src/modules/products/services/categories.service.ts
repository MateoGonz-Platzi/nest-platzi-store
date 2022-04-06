import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/categories.dtos';
@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Tenis y Zapatillas',
      description: 'Zapatos de Skateboarding'
    }
  ];

    //Retorna todos
    findAll() {
      return this.categories;
    }
    //Retorna solo uno
    findOne(id: number) {
      const CATEGORY = this.categories.find((item) => item.id === id);
      if (!CATEGORY) {
        throw new NotFoundException(
          `ERROR_SERVICE: The category ${id} does not exist`,
        );
      }
      return CATEGORY;
    }
  
    create(payload: CreateCategoryDto) {
      console.log(payload);
      this.counterId += 1;
      const newCategory = {
        id: this.counterId,
        ...payload,
      };
      this.categories.push(newCategory);
      return newCategory;
    }
  
    update(id: number, payload: UpdateCategoryDto) {
      const CATEGORY = this.findOne(id);
      if (CATEGORY) {
        const index = this.categories.findIndex((item) => item.id === id);
        this.categories[index] = {
          ...CATEGORY,
          ...payload,
        };
        return this.categories[index];
      }
      return { message: 'ERROR_SERVICE: The id does not exist.' };
    }
  
    remove(id: number) {
      const CATEGORY = this.findOne(id);
      if (!CATEGORY) {
        throw new NotFoundException(
          `ERROR_SERVICE: The category ${id} does not exist`,
        );
      } else {
        const temp = CATEGORY;
        this.categories = this.categories.filter((item) => item.id !== id);
        return { message: 'The category is deleted', deleted: temp };
      }
    }
}
