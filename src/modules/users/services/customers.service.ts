import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomersDto, UpdateCustomersDto } from '../dtos/customers.dtos';
import { Customer } from './../entities/customer.entity';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>
  ) {}

  //Return all customer
  findAll() {
    return this.customerRepo.find();
  }
  
  //Return customer by id
  findOne(id: number) {
    const CUSTOMER = this.customerRepo.findOneBy({id});
    if (!CUSTOMER) {
      throw new NotFoundException(
        `ERROR_SERVICE: The customer ${id} does not exist`,
      );
    }
    return CUSTOMER;
  }

  //create customer
  create(payload: CreateCustomersDto) {
    const newCustomer = this.customerRepo.create(payload);
    return this.customerRepo.save(newCustomer);
  }

  //update customer
  async update(id: number, payload: UpdateCustomersDto) {
    const CUSTOMER = await this.findOne(id);
    if(CUSTOMER) {
      this.customerRepo.merge(CUSTOMER, payload);
      return this.customerRepo.save(CUSTOMER);
    }
    throw new NotFoundException(
      `ERROR_SERVICE: The user ${id} does not exist`,
    );
  }

  //Remove customer
  remove(id: number) {
    const CUSTOMER = this.findOne(id);
    if (CUSTOMER) {
      return this.customerRepo.delete(id);
    } 
    throw new NotFoundException(
      `ERROR_SERVICE: The CUSTOMER ${id} does not exist`,
    );
  }
}
