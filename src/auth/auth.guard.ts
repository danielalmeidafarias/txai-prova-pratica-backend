import * as dotenv from 'dotenv';
dotenv.config();
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { TokenExpiredError } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject() private authService: AuthService,
    @Inject() private usersRepostory: UsersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const access_token = request.cookies['access_token'];
    if (!access_token) {
      throw new UnauthorizedException();
    }

    try {
      const user_id = await this.authService.verify_token(access_token);
      const user = await this.usersRepostory.get_one_by_id(user_id);
      const now_date = new Date();

      response.cookie(
        'access_token',
        await this.authService.get_access_token(user_id),
        {
          expires: new Date(now_date.setHours(now_date.getHours() + 1)),
          httpOnly: true,
          sameSite: 'lax',
          secure: true,
        },
      );
      request['user'] = user;

      return true;
    } catch (err) {
      const refresh_token = request.cookies['refresh_token'];
      if (!refresh_token) {
        throw new UnauthorizedException();
      }
      if (err instanceof TokenExpiredError) {
        try {
          const user_id = await this.authService.verify_token(refresh_token);
          const user = await this.usersRepostory.get_one_by_id(user_id);
          const now_date = new Date();
          response.cookie(
            'access_token',
            await this.authService.get_access_token(user_id),
            {
              expires: new Date(now_date.setHours(now_date.getHours() + 1)),
              httpOnly: true,
              sameSite: 'lax',
              secure: true
            },
          );
          response.cookie(
            'refresh_token',
            await this.authService.get_refresh_token(user_id),
            {
              expires: new Date(now_date.setHours(now_date.getHours() + 1)),
              httpOnly: true,
              sameSite: 'lax',
              secure: true,
            },
          );
          request['user'] = user;

          return true;
        } catch {
          throw new UnauthorizedException();
        }
      }
      throw new UnauthorizedException();
    }
  }
}
