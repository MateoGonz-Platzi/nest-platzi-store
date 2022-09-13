import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const DEV_API_KEY = '1123638991';
const PROD_API_KEY = 'prod1123638';

//Inject DataBase connection
const client = new Client({
  user: 'root',
  password: '123456',
  database: 'store_db',
  host: 'localhost',
  port: 5432
});

client.connect();

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? PROD_API_KEY : DEV_API_KEY
    },
    {
      provide: 'PG_CONNECTION',
      useValue: client
    },
  ],
  exports: ['API_KEY', 'PG_CONNECTION'],
})
export class DatabaseModule {}
