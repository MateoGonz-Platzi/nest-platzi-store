import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }

  async userAuth(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) return user;
    }
    return null;
  }
}
