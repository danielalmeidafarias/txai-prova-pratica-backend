import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, AuthService],
})
export class UsersModule {}
