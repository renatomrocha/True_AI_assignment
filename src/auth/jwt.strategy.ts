import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstant } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret,
    });
  }

  async validate(payload: any) {
      const reconstructedToken = {id: payload.sub, username: payload.username};
      console.log('Reconstructed token: ', reconstructedToken);
      if(reconstructedToken.id === undefined || reconstructedToken.username === undefined) {
          return UnauthorizedException;
      } else {
        return { id: payload.sub, username: payload.username };
      }
  }

}