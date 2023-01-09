import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PUBLIC_KEY } from '../decorators/public-request.decorator';

@Injectable()
export class ApikeyGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const publicRequest = this.reflector.get(PUBLIC_KEY, context.getHandler());
    if (publicRequest) return true;
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.header('auth');
    const isAuth = authHeader === 'ae345erdfz#';
    if (!isAuth) throw new UnauthorizedException('Not allow, auth is required');
    return isAuth;
  }
}
