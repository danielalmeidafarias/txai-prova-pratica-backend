import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumberString,
  IsEmail,
  IsStrongPassword,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nickname: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fullname: string;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  cpf: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiPropertyOptional()
  @IsStrongPassword()
  @IsOptional()
  password: string;

  @ApiPropertyOptional()
  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
