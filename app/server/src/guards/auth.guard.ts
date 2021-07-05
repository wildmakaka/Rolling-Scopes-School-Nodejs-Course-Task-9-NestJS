import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { config } from 'common/config';
import { verify } from 'jsonwebtoken';

// import { IExpressRequest } from 'types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<any>();

    if (!request.headers.authorization) {
      throw new HttpException('[App] UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    const token = request.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, config.JWT_SECRET_KEY);

      if (!decode) {
        throw new HttpException('[App] UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      }

      return true;
    } catch (err) {
      console.log(err);
      throw new HttpException('[App] UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
  }
}
