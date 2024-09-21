import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

interface ICreateUser {
  username: string;
  email: string;
  password: string;
  role: Role;
}

interface IUpdateUser {
  data: Partial<ICreateUser>;
  user_id: string;
}

@Injectable()
export class UsersRepository {
  constructor(@Inject() private prismaService: PrismaService) {}

  async create({
    email,
    password,
    role,
    username,
  }: ICreateUser): Promise<User> {
    const new_user = await this.prismaService.user.create({
      data: {
        email,
        password,
        role,
        username,
      },
    });

    return new_user;
  }

  async update({ data, user_id }: IUpdateUser) {
    const updated_user = await this.prismaService.user.update({
      where: {
        id: user_id,
      },
      data,
    });

    return updated_user;
  }

  async get_one_by_id(user_id: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        id: user_id,
      },
    });

    return user;
  }

  async get_one_by_email(email: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    return user;
  }

  async get_all() {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  async get_some_by_name(username: string) {
    const users = await this.prismaService.user.findMany({
      where: {
        username,
      },
    });

    return users;
  }

  async delete(user_id: string) {
    await this.prismaService.user.delete({
      where: {
        id: user_id,
      },
    });
  }
}
