import { Module } from '@nestjs/common';
import { MessagehistoryService } from './messagehistory.service';
import { MessagehistoryController } from './messagehistory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Messagehistory,
  MessagehistorySchema,
} from './entities/messagehistory.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Messagehistory.name,
        schema: MessagehistorySchema,
      },
    ]),
  ],
  controllers: [MessagehistoryController],
  providers: [MessagehistoryService],
  exports: [MessagehistoryService],
})
export class MessagehistoryModule {}
