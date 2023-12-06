import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessagehistoryService } from './messagehistory.service';
import { CreateMessagehistoryDto } from './dto/create-messagehistory.dto';

@Controller('messagehistory')
export class MessagehistoryController {
  constructor(private readonly messagehistoryService: MessagehistoryService) {}

  @Post()
  create(@Body() createMessagehistoryDto: CreateMessagehistoryDto) {
    return this.messagehistoryService.create(createMessagehistoryDto);
  }

  @Get()
  findAll() {
    return this.messagehistoryService.findAll();
  }
}
