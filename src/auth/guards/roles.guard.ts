import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { PayloadToken } from '../model/token.model';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../model/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const auth = roles.some((role) => role === user.role);

    if (!roles) { return true; } //In case of not uses the role decorator.
    if (!auth) throw new ForbiddenException('You role is wrong');
    return auth;
  }
}
