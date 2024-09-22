import 'dotenv/config';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as bcript from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private usersRepository: UsersRepository,
    @Inject() private jwtService: JwtService,
  ) {}

  async login({ cpf, password }: LoginDto, res: Response) {
    try {
      const user = await this.usersRepository.get_one_by_cpf(cpf);

      const isPasswordCorrect = bcript.compareSync(password, user.password);

      if (isPasswordCorrect) {
        const now_date = new Date();
        res.cookie('access_token', await this.get_access_token(user.id), {
          expires: new Date(now_date.setHours(now_date.getHours() + 1)),
          httpOnly: true,
        });
        res.cookie('refresh_token', await this.get_refresh_token(user.id), {
          expires: new Date(now_date.setDate(now_date.getDate() + 1)),
          httpOnly: true,
        });
        return res.status(200).json({ message: 'Successful Login!' });
      } else {
        throw new UnauthorizedException('Wrong password');
      }
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException({
            message: `There is no registered user with ${cpf} cpf`,
          });
        }
      }
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async logout(res: Response) {
    res.cookie('access_token', null);
    res.cookie('refresh_token', null);

    return res.status(200).json({ message: 'Successful logout!' });
  }

  async get_access_token(user_id: string) {
    const access_token = await this.jwtService.signAsync(
      { sub: user_id },
      { expiresIn: '1h', secret: process.env.JWT_SECRET },
    );
    return access_token;
  }

  async get_refresh_token(user_id: string) {
    const refresh_token = await this.jwtService.signAsync(
      { sub: user_id },
      { expiresIn: '1d', secret: process.env.JWT_SECRET },
    );
    return refresh_token;
  }

  async verify_token(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const user_id: string = payload.sub;
    return user_id;
  }
}
