import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//Controllers
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
//Services
import { UsersService } from './services/user.service';
import { CustomerService } from './services/customers.service';
//Modules
import { ProductsModule } from './../products/products.module';
//Schema
import { Customer, CustomerSchema } from './entities/customer.entity';

@Module({
  imports: [ 
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema
      }
    ])
  ], 
  controllers: [UsersController, CustomersController], 
  providers: [UsersService, CustomerService],
})
export class UsersModule {}
