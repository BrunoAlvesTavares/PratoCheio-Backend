import { Prop } from '@nestjs/mongoose';

export class CreateMessagehistoryDto {
  @Prop({ required: true })
  nameInstituiton: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}
