import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumberString,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

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
}
