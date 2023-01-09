import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }

  async userAuth(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    const match = await bcrypt.compare(pass, user.password);
    if (user && match) {
      return user;
    }
    return null;
  }
}
