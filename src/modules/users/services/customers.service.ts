import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCustomersDto, UpdateCustomersDto } from '../dtos/customers.dtos';
import { Customer } from './../entities/customer.entity';

@Injectable()
export class CustomerService {
  
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  //Return all customer
  async findAll() {
    return await this.customerModel.find().exec();
  }
  
  //Return customer by id
  async findOne(id: string) {
    const CUSTOMER = await this.customerModel.findById(id).exec();
    if (!CUSTOMER) {
      throw new NotFoundException(
        `ERROR_SERVICE: The customer ${id} does not exist`,
      );
    }
    return CUSTOMER;
  }

  //create customer
  async create(payload: CreateCustomersDto) {
    const newCustomer = await new this.customerModel(payload);
    return newCustomer.save();
  }

  //update customer
  async update(id: string, payload: UpdateCustomersDto) {
    const CUSTOMER = await this.customerModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true } )
      .exec();
    if(!CUSTOMER) {
      throw new NotFoundException(
        `ERROR_SERVICE: The customer ${id} does not exist`,
      );
    }
  }

  //Remove customer
  async remove(id: string) {
    return await this.customerModel.findByIdAndRemove(id);
  }
}
