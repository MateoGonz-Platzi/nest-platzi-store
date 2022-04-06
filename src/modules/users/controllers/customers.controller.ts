import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateCustomersDto, UpdateCustomersDto } from './../dtos/customers.dtos';
import { CustomerService } from './../services/customers.service';


@ApiTags('CUSTOMERS')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomerService) {}

  @Get()
  getCustomers() {
    return this.customersService.findAll();
  };

  @Get(':customerId')
  getOne(
    @Param('customerId', ParseIntPipe) customerId: number) 
    { return this.customersService.findOne(customerId); };
  
  @Post()
  create(@Body() payload: CreateCustomersDto) {
    return this.customersService.create(payload);
  };

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCustomersDto) {
    return this.customersService.update(id, payload);
  };

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  };
}
