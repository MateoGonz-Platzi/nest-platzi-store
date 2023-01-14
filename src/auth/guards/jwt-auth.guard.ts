import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_KEY } from '../decorators/public-request.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const publicRequest = this.reflector.get(PUBLIC_KEY, context.getHandler());
    if (publicRequest) return true;
    return super.canActivate(context); //If metadata is not available    
  }
}
