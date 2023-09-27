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

  @Prop()
  description: string;

  @Prop()
  establishedYear: number;

  @Prop()
  contactEmail: string;

  @Prop()
  website: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    default: null,
  })
  UserInstituition: User | Types.ObjectId | null;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
