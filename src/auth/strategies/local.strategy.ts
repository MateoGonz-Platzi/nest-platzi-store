import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

  constructor(private authService: AuthService) {
    super({ //because extends a class
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.userAuth(email, password);
    if (!user) {
      throw new UnauthorizedException("User isn't authenticated");
    }
    return user;
  }
}