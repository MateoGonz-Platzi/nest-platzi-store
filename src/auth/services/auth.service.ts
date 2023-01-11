import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/services/user.service';
import { PayloadToken } from '../model/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async userAuth(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) return user;
    }
    return null;
  }

  generateJwt(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user
    }
  }
}
