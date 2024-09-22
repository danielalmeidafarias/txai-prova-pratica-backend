import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

interface ICreateUser {
  nickname: string;
  fullname: string;
  cpf: string;
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
    nickname,
    email,
    fullname,
    cpf,
    password,
    role,
  }: ICreateUser): Promise<User> {
    const new_user = await this.prismaService.user.create({
      data: {
        email,
        nickname,
        fullname,
        password,
        cpf,
        role,
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
      select: {
        id: true,
        email: true,
        nickname: true,
        products: true,
        cpf: true,
        fullname: true,
        password: true,
        role: true,
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

  async get_one_by_cpf(cpf: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        cpf,
      },
    });

    return user;
  }

  async get_all() {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  async get_some_by_nickname(nickname: string) {
    const users = await this.prismaService.user.findMany({
      where: {
        OR: [
          {
            nickname: {
              startsWith: `%${nickname}%`,
            },
          },
        ],
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
