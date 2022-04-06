import { Module } from '@nestjs/common';
//Controllers
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
//Services
import { UsersService } from './services/user.service';
import { CustomerService } from './services/customers.service';
//Modules
import { ProductsModule } from './../products/products.module';

@Module({
  imports: [ ProductsModule], 
  controllers: [UsersController, CustomersController], 
  providers: [UsersService, CustomerService],
})
export class UsersModule {}
