import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { User } from './../entities/user.entity';
//import { Order } from './../../orders/entities/order.entity';
//Import Products Service 
import { ProductsService } from './../../products/services/products.service';
@Injectable()
export class UsersService {

  constructor(private productsService: ProductsService) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'Mateo',
      lastname: 'Grisales González',
      email: 'Matt.Grisa@Gmail.com',
      phone: '+57 3042124656'
    }
  ];

  //Return all users
  findAll() {
    return this.users;
  }

  //Return user by id
  findOne(id: number) {
    const USER = this.users.find((item) => item.id === id);
    if (!USER) {
      throw new NotFoundException(
        `ERROR_SERVICE: The user ${id} does not exist`,
      );
    }
    return USER;
  }

  //create user
  create(payload: CreateUserDto) {
    console.log(payload);
    this.counterId += 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  //update user
  update(id: number, payload: UpdateUserDto) {
    const USER = this.findOne(id);
    if(USER) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...USER,
        ...payload,
      };
      return this.users[index];
    }
    return { message: 'ERROR_SERVICE: The id does not exist.' };
  }

  //Remove User
  remove(id: number) {
    const USER = this.findOne(id);
    if (!USER) {
      throw new NotFoundException(
        `ERROR_SERVICE: The user ${id} does not exist`,
      );
    } else {
      const temp = USER;
      this.users = this.users.filter((item) => item.id !== id);
      return { message: 'The user is deleted', deleted: temp };
    }
  }

  //Relation with Orders
  async getOrderByUser(id: number) {
    const USER = this.findOne(id);
    return {
      date: new Date(),
      user: USER,
      products: await this.productsService.findAll()
    };
  }
}
