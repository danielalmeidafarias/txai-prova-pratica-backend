import {
  Injectable,
  Inject,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(@Inject() private usersRepostory: UsersRepository) {}

  async create({ email, username, password }: CreateUserDto) {
    try {
      const new_user = await this.usersRepostory.create({
        email,
        password: await bcrypt.hash(password, bcrypt.genSaltSync()),
        role: 'USER',
        username,
      });

      return {
        message: 'User Created with success',
        user: new_user,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code == 'P2002') {
          throw new ConflictException({
            message: `There is already a registered user with this email`,
          });
        }
      }
      console.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepostory.get_all();
      return users;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepostory.get_one_by_id(id);
      return user;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException({
            message: `There is no registered user with ${id} id`,
          });
        }
      }
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, { email, password, username }: UpdateUserDto) {
    try {
      const updatedUser = await this.usersRepostory.update({
        user_id: id,
        data: {
          email,
          password,
          username,
        },
      });
      return {
        message: 'User updated successfully',
        user: updatedUser,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException(err.message);
        }
        if (err.code === 'P2003') {
          throw new ConflictException(err.message);
        }
        if (err.code === 'P2025') {
          throw new NotFoundException(err.message);
        }
      }
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      await this.usersRepostory.delete(id);
      return { message: `User with ID ${id} deleted successfully` };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2001') {
          throw new BadRequestException({
            message: `There is no registered user with ${id} id`,
          });
        } else if (err.code === 'P2014') {
          throw new BadRequestException(err.message);
        }
      }
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
