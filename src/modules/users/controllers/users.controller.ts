import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { UsersService } from './../services/user.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  //Return all users
  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  //Return user by id
  @Get(':userId')
  getOne(@Param('userId', ParseIntPipe) userId: number,) { 
    return this.userService.findOne(userId); 
  }

  //Create User
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  //Update User
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }

  //Delete User
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  //Relation with Orders
  @Get(':userId/orders')
  getOrders(@Param('userId', ParseIntPipe) userId: number,) { 
    //return this.userService.getOrderByUser(userId); 
  }
}
