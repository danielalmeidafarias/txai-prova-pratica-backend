import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  password: string;
}
