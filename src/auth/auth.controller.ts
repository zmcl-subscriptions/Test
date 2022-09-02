import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth-Module')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //@UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('register')
  async create(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('validate')
  async validate() {
    return true;
  }
}
