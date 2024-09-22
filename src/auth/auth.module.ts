import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, PrismaService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
