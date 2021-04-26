import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';


@Injectable()
export class AuthService {

        constructor(private usersService: UsersService, private jwtService: JwtService) {
            
        }


        async validateUser(username: string, pass: string): Promise<any> {
            const user = await this.usersService.findOne(username);
            if (user && user.password === pass) {
              const { password, ...result } = user;
              return result;
            }
            return null;
          }


          async generateAccessToken(user: any) {           
            return this.usersService.findOne(user.username)
            .then((r :any) => {
              const payload = { username: r.username, sub: r._id};
              if(r) {
                const access_token = this.jwtService.sign(payload);
                const jwtObj : any = this.jwtService.decode(access_token);
                return {
                  expires_at: new Date(jwtObj.exp * 1000),
                  token: access_token,
                };
              } else {
                return UnauthorizedException;
              }
            })
          }

          public processAuthorizationBasic(encodedInfo) {
            const strings = encodedInfo.split(" ");
            const token = strings[strings.length - 1];
            const userinfo = Buffer.from(token, 'base64').toString('ascii').split(":");
            return {username: userinfo[0], password: userinfo[1]};
        }



}
