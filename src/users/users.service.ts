import { LoginUserDto } from './../dto/login-user-dto';
import { Model } from 'mongoose';
import { Injectable} from '@nestjs/common';
import {User, UserDocument} from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './../dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(userDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(userDto);    
        return createdUser.save();
    }

    async login(userDto: LoginUserDto) : Promise<any[]> {
        return this.userModel.find({email: userDto.email, password: userDto.password})
        .then(r => {
            console.log('Query returned: ', r);
            return r;
        })
    }    


    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(username: string) : Promise<User> {
        return this.userModel.findOne({'username' : username}).exec();
    }

    async find(id: string) : Promise<User> {
        return (await this.userModel.findById(id)).execPopulate();
    }


    async createSession(user: User) {
        const newSessionUuid = uuidv4();
        return this.userModel.findOneAndUpdate({username: user.username},{session: newSessionUuid})
        .then( r => {
            // Here I could reset models and caches for user
            return {result: newSessionUuid, error: null}
        })

    }


    async updateRenewalCounts(_username: string, _renewalCounts: number) : Promise<User> {
        return (await this.userModel.findOneAndUpdate({username: _username}, {renewalCounts: _renewalCounts}));
    }


    public processAuthorizationBasic(encodedInfo) {
        const strings = encodedInfo.split(" ");
        const token = strings[strings.length - 1];
        const userinfo = Buffer.from(token, 'base64').toString('ascii').split(":");
        return {username: userinfo[0], password: userinfo[1]};
    }



  


}
