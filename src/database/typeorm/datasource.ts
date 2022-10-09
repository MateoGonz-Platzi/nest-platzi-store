import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

//env config
config();
const configService = new ConfigService();

export const connectionSource = new DataSource({
  type: 'postgres',
  host: configService.get('PG_HOST'),
  port: configService.get('PG_PORT'),
  username: configService.get('PG_USER'),
  password: configService.get('PG_PASSWORD'),
  database: configService.get('PG_DATABASE'),
  logging: true,
  synchronize: false, 
  entities: ['src/**/*.entity.ts'],
  migrations: [configService.get('MIGRATIONS_DIR')],
});
