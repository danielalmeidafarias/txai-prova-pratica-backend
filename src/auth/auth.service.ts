import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(@Inject() private usersRepository: UsersRepository) {}

  login({ cpf, password }: LoginDto) {
    return 'This action adds a new auth';
  }

  logout() {
    return `This action returns all auth`;
  }

  refresh() {}
}
