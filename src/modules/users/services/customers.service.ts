import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomersDto, UpdateCustomersDto } from '../dtos/customers.dtos';
import { Customer } from './../entities/customer.entity';

@Injectable()
export class CustomerService {
  private counterId = 1;
  private customer: Customer[] = [
    {
      id: 1,
      name: 'John',
      lastname: 'Wick',
      email: 'john@example.com',
      phone: '123-456-485'
    }
  ];

  //Return all customer
  findAll() {
    return this.customer;
  }
  
  //Return customer by id
  findOne(id: number) {
    const CUSTOMER = this.customer.find((item) => item.id === id);
    if (!CUSTOMER) {
      throw new NotFoundException(
        `ERROR_SERVICE: The customer ${id} does not exist`,
      );
    }
    return CUSTOMER;
  }

  //create customer
  create(payload: CreateCustomersDto) {
    console.log(payload);
    this.counterId += 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customer.push(newCustomer);
    return newCustomer;
  }

  //update customer
  update(id: number, payload: UpdateCustomersDto) {
    const CUSTOMER = this.findOne(id);
    if(CUSTOMER) {
      const index = this.customer.findIndex((item) => item.id === id);
      this.customer[index] = {
        ...CUSTOMER,
        ...payload,
      };
      return this.customer[index];
    }
    return { message: 'ERROR_SERVICE: The id does not exist.' };
  }

  //Remove customer
  remove(id: number) {
    const CUSTOMER = this.findOne(id);
    if (!CUSTOMER) {
      throw new NotFoundException(
        `ERROR_SERVICE: The CUSTOMER ${id} does not exist`,
      );
    } else {
      const temp = CUSTOMER;
      this.customer = this.customer.filter((item) => item.id !== id);
      return { message: 'The user is deleted', deleted: temp };
    }
  }
}
