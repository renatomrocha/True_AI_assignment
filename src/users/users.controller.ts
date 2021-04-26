import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './../auth/auth.service';
import { UsersService } from './users.service';
import { Controller, Request, Post, Get, Body, Param, Res, HttpStatus, Delete, UseGuards, Req, UnauthorizedException, BadRequestException, HttpException } from '@nestjs/common';
import {Response} from 'express';



@Controller('user')
export class UsersController {

    constructor(private usersService : UsersService, private authService: AuthService){}


    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUserInfo(@Request() req, @Res({passthrough: true}) res: Response): Promise<any> {
        const userInfo = req.user;
        return this.usersService.findOne(userInfo.username)
        .then(r => {
            return r; 
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/session')
    async createSession(@Request() req): Promise<any> {
      return await this.usersService.createSession(req.user);
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('/session/:sessionId/completions')
    async getPrediction(@Request() req, @Param() params: any, @Body() requestBody: any) {
      if(!(requestBody.query && requestBody.events)){
          throw new HttpException('Bad request, body must contain parameters query and events', HttpStatus.BAD_REQUEST);
      } else {
        console.log('I got session with id: ', params.sessionId);
        console.log('Will look for session information...');
        console.log('Sending body information to model', requestBody);
        const prediction = 'This is a prediction made according to session ' + params.sessionId;
        return prediction;
      }

    }
  

  @UseGuards(AuthGuard('jwt'))
  @Get('/renew')
  async renewToken(@Request() req) {
    const userInfo = req.user;
    const user = await this.usersService.findOne(userInfo.username);
    const counts = user.renewalCounts;
    if(counts < 100) {
      this.usersService.updateRenewalCounts(userInfo.username, counts+1);
      return this.authService.generateAccessToken(userInfo);
    } else {
      throw new HttpException('Unauthorized, Token renew requests have been exceeded, please login to the platform again', HttpStatus.UNAUTHORIZED);
    }
   
  }

   
}
