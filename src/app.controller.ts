import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDTO } from './shared/dto/login.dto';
import { RegistrationDTO } from './shared/dto/registration.dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {

  constructor(
    private appService: AppService,
    private jwtService: JwtService
  ) {}

  @Post('registration')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registration(@Body() registrationDTO: RegistrationDTO) {
    const user = await this.appService.registration(registrationDTO);
    const accessToken = await this.jwtService.signAsync({
      _id: user._id.toString(),
      login: user.login,
    });

    return {
      accessToken,
    }
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.appService.login(loginDTO);
    const accessToken = await this.jwtService.signAsync({
      _id: user._id.toString(),
      login: user.login,
    });

    return {
      accessToken,
    }
  }
}
