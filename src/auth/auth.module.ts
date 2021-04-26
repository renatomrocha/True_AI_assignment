import { JwtStrategy } from './jwt.strategy';
import { jwtConstant } from './constants';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from './../users/users.module';
import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports:[UsersModule, PassportModule, JwtModule.register({
    secret: jwtConstant.secret,
    signOptions: {expiresIn : '120s'}
  })],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
