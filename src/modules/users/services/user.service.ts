import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { User } from './../entities/user.entity';
import { Order } from './../entities/order.entity';
//Import Products Service 
import { ProductsService } from './../../products/services/products.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {

  constructor(
    private productsService: ProductsService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  //Return all users
  findAll() {
    return this.userRepo.find();
  }

  //Return user by id
  async findOne(id: number) {
    const USER = await this.userRepo.findOneBy({id});
    if (!USER) {
      throw new NotFoundException(
        `ERROR_SERVICE: The user ${id} does not exist`,
      );
    }
    return USER;
  }

  //create user
  create(payload: CreateUserDto) {
    const newUser = this.userRepo.create(payload);
    return this.userRepo.save(newUser);
  }

  //update user
  async update(id: number, payload: UpdateUserDto) {
    const USER = await this.findOne(id);
    if(USER) {
      this.userRepo.merge(USER, payload);
      return this.userRepo.save(USER);
    }
    throw new NotFoundException(
      `ERROR_SERVICE: The user ${id} does not exist`,
    );
  }

  //Remove User
  async remove(id: number) {
    const USER = await this.findOne(id);
    if (USER) {
      return this.userRepo.delete(id);
    }
    throw new NotFoundException(
      `ERROR_SERVICE: The user ${id} does not exist`,
    );
  }

  //Relation with Orders
  // getOrderByUser(id: number): Order {
  //   const USER = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user: USER,
  //     products: []/* this.productsService.findAll() */
  //   };
  // }
}
