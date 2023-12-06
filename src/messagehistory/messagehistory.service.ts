import { Injectable } from '@nestjs/common';
import { CreateMessagehistoryDto } from './dto/create-messagehistory.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Messagehistory,
  MessagehistoryDocument,
} from './entities/messagehistory.entity';
import { Model } from 'mongoose';

@Injectable()
export class MessagehistoryService {
  constructor(
    @InjectModel(Messagehistory.name)
    private messageHistoryModel: Model<MessagehistoryDocument>,
  ) {}
  create(createMessagehistoryDto: CreateMessagehistoryDto) {
    const createdBook = new this.messageHistoryModel(createMessagehistoryDto);
    return createdBook.save();
  }

  findAll() {
    return this.messageHistoryModel.find();
  }
}
