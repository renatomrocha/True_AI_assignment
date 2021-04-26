import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { Controller, Request, UseGuards, Post, Get, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private usersService: UsersService, private authService: AuthService) {}

  @Post('/login')
  async login(@Request() req) {
    const userObj = this.authService.processAuthorizationBasic(req.headers.authorization);
    this.usersService.updateRenewalCounts(userObj.username, 0);
    return this.authService.generateAccessToken(userObj);
  }

  




}
