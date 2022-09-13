import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
//Enviroments Config
import { ConfigModule } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import * as Joi from 'joi';
import { Client } from 'pg';

//Environment
import { environments } from './environments';
//Controllers
import { AppController } from './app.controller';
import { OrdersController } from './modules/orders/controllers/orders.controller';
//Services
import { AppService } from './app.service';
//Modules
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './database/database.module';
import config from './config';

const client = new Client({
  user: 'root',
  password: '123456',
  database: 'store_db',
  host: 'localhost',
  port: 5432
});

client.connect();

client.query('SELECT * FROM tasks', (err, res) => {
  (err) ? console.log(err) : console.log('DB CONNECTED');
  console.log(res.rows);
})
@Module({
  imports: [
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
  controllers: [ AppController, OrdersController, ],
  providers: [ 
    AppService, 
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await lastValueFrom(
          http.get( 'https://jsonplaceholder.typicode.com/todos'),
        );
        return tasks.data;
      }, 
      inject: [HttpService],
    },
  ],
})
export class AppModule { }
