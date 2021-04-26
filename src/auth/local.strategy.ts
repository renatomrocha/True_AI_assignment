
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    
  constructor(private authService: AuthService) {
    super();
  }

  async validate(encodedInfo: string): Promise<any> {
    console.log('Recbi encoded: ', encodedInfo);
    const decodedInfo = this.authService.processAuthorizationBasic(encodedInfo);
    console.log('Vou passar ao validate: ', decodedInfo);
    const user = await this.authService.validateUser(decodedInfo.username, decodedInfo.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }




}
