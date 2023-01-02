//Module settings
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//Controllers
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
//Services
import { UsersService } from './services/user.service';
import { CustomerService } from './services/customers.service';
//Modules
import { ProductsModule } from './../products/products.module';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer])
  ],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomerService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule { }
