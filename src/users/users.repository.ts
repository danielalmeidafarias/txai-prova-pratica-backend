import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

interface ICreateUser {
  username: string;
  email: string;
  password: string;
  role: Role;
}

@Injectable()
export class UserRepository {
  constructor(@Inject() prismaService: PrismaService) {}

  async create({}: ICreateUser) {}

  async update({}: Partial<ICreateUser>) {}

  async get_one_by_id(user_id: string) {}

  async get_one_by_email(email: string) {}

  async get_all() {}

  async get_some_by_name(username: string) {}
}
