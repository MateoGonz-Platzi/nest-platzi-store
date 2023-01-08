import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApikeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.header('Auth');
    const isAuth = authHeader === 'ae345erdfz#';

    if (!isAuth) {
      throw new UnauthorizedException('Not allow, auth is required');
    }
    return isAuth;
  }
}
