import { Controller, Post, Body } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('sendMessage')
  async sendMessage(@Body() messageData: { message: string }) {
    const { message } = messageData;
    await this.whatsappService.sendMessagesToUsers(message);
  }
}
