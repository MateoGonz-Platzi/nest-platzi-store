import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';


import Config from '../config/config';

const DEV_API_KEY = '1123638991';
const PROD_API_KEY = 'prod1123638';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [Config.KEY],
      useFactory: (configService: ConfigType<typeof Config>) => {
        const {user, password, database, host, port} = configService.pgDatabase;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    })
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? PROD_API_KEY : DEV_API_KEY
    },
    {
      provide: 'PG_CONNECTION',
      useFactory: (configService: ConfigType<typeof Config>) => {
        const {user, password, database, host, port} = configService.pgDatabase;
        //Inject DataBase connection
        const client = new Client({
          user,
          password,
          database,
          host,
          port
        });
        client.connect();
        return client;
      },
      inject: [Config.KEY]
    },
  ],
  exports: ['API_KEY', 'PG_CONNECTION', TypeOrmModule],
})
export class DatabaseModule {}
