import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
//Enviroments Config
import { ConfigModule } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
//Environment
import { environments } from './environments';
//Controllers
import { AppController } from './app.controller';
//Services
import { AppService } from './app.service';
//Modules
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './modules/orders/orders.module';

import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import config from './config/config';
@Module({
  imports: [
    AuthModule,
    OrdersModule,
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || './.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        API_KEY: Joi.string().required(),
        ENVIROMENT: Joi.string().required()
      })
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await lastValueFrom(
          http.get('https://jsonplaceholder.typicode.com/todos'),
        );
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule { }
