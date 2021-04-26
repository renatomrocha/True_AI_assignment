import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule,AuthModule,MongooseModule.forRoot('mongodb://localhost/trueai')],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
