import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { IsEmail } from 'class-validator';

export type BookDocument = Document & Book;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ default: null })
  @IsEmail()
  email: string; 

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    default: null,
  })
  trocadoPor: User | Types.ObjectId | null;
}

export const BookSchema = SchemaFactory.createForClass(Book);
