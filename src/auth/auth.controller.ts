import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  sign_in(@Body() signinDto: LoginDto) {
    return this.authService.login(signinDto);
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @Get('/refresh')
  refresh_token() {
    return this.authService.refresh();
  }
}
