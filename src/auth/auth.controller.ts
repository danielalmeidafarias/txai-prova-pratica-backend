import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async sign_in(@Body() signinDto: LoginDto, @Res() res: Response) {
    return await this.authService.login(signinDto, res);
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    return await this.authService.logout(res);
  }
}
