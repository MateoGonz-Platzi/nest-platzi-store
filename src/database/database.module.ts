import { Module, Global } from '@nestjs/common';

const DEV_API_KEY = '1123638991';
const PROD_API_KEY = 'prod1123638';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? PROD_API_KEY : DEV_API_KEY
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
