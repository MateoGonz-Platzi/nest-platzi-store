import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import Config from 'src/config/config';

import { UsersModule } from './../modules/users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [Config.KEY],
      useFactory: (configService: ConfigType<typeof Config>) => {
        const { jwtSecret, sessionTime } = configService.jwtConfig;
        return {
          secret: jwtSecret, signOptions: { expiresIn: sessionTime }
        }
      }
    })
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
