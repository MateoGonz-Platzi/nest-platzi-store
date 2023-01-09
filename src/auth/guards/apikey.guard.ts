import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import config from 'src/config/config';
import { PUBLIC_KEY } from '../decorators/public-request.decorator';

@Injectable()
export class ApikeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const publicRequest = this.reflector.get(PUBLIC_KEY, context.getHandler());
    if (publicRequest) return true;
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.header('auth');
    const isAuth = authHeader === this.configService.apiKey;
    if (!isAuth) throw new UnauthorizedException('Not allow, auth is required');
    return isAuth;
  }
}
