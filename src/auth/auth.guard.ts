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
import { Prisma } from '@prisma/client';

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
      response.cookie(
        'access_token',
        await this.authService.get_access_token(user_id),
      );
      request['user'] = user;

      return true;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        try {
          const refresh_token = request.cookies['refresh_token'];

          const user_id = await this.authService.verify_token(refresh_token);
          response.cookie(
            'access_token',
            await this.authService.get_access_token(user_id),
          );
          response.cookie(
            'refresh_token',
            await this.authService.get_refresh_token(user_id),
          );
          request['user_id'] = user_id;

          return true;
        } catch {
          throw new UnauthorizedException();
        }
      }
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new UnauthorizedException();
        }
      }
      throw new UnauthorizedException();
    }
  }
}
