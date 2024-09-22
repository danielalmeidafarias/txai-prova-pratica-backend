import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumberString,
  IsEmail,
  IsStrongPassword,
  IsEnum,
} from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @IsString()
  nickname: string;

  @ApiPropertyOptional()
  @IsString()
  fullname: string;

  @ApiPropertyOptional()
  @IsNumberString()
  cpf: string;

  @ApiPropertyOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsStrongPassword()
  password: string;

  @ApiPropertyOptional()
  @IsEnum(Role)
  role: Role;
}
