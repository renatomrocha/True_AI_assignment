import { AuthModule } from './../auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../schemas/user.schema';
import { Module, HttpModule, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  imports: [HttpModule, forwardRef(()=> AuthModule) ,MongooseModule.forFeature([{ name : User.name , schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
