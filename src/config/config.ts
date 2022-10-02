import { registerAs } from '@nestjs/config';

export default registerAs('config', ( ) => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT
    },
    pgDatabase: {
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT, 10)
    },
    mySqlDatabase: {
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10)
    },
    apiKey: process.env.API_KEY,
    enviroment: process.env.ENVIROMENT
  }
});