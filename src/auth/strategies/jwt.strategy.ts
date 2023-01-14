import { PayloadToken } from './../model/token.model';
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import config from "src/config/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) { //Inject config
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Header brearer token
      ignoreExpiration: false, //Needs expiration for validation.
      secretOrKey: configService.jwtConfig.jwtSecret
    });
  }

  validate(payload: PayloadToken) {
    return payload;
  }
}