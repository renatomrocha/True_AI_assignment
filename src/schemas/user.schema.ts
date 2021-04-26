import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;


@Schema()
export class User {
    
    @Prop()
    name: string;

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    renewalCounts: number;

  

}

export const UserSchema = SchemaFactory.createForClass(User);


// Decorators são utilizados pelo Schemafactory para extrapolar um schema através da class com recurso a reflection
// Podemos definir schema manualmente como fazemos no nodejs
