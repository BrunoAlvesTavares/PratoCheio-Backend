import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessagehistoryDocument = HydratedDocument<Messagehistory>;

@Schema()
export class Messagehistory {
  @Prop({ required: true })
  nameInstituiton: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const MessagehistorySchema =
  SchemaFactory.createForClass(Messagehistory);
