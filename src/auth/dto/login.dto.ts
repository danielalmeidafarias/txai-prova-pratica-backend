import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNumberString()
  cpf: string;

  @ApiProperty()
  @IsString()
  password: string;
}
