import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Book } from 'src/books/entities/book.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    required: true,
    enum: ['admin', 'viewer'],
  })
  accessLevel: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
