import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type InstitutionDocument = HydratedDocument<Institution>;

@Schema()
export class Institution {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  establishedYear: number;

  @Prop({ required: true })
  contactEmail: string;

  @Prop()
  website: string;

  @Prop()
  pix: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    default: null,
  })
  UserInstituition: User | Types.ObjectId | null;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
