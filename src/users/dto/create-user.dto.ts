import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsNumberString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsNumberString()
  @Length(11)
  cpf: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
