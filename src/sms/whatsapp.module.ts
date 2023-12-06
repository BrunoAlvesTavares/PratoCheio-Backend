import { Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappService } from './whatsapp.service';
import { UsersModule } from 'src/users/users.module';
import { MessagehistoryModule } from 'src/messagehistory/messagehistory.module';

@Module({
  imports: [UsersModule, MessagehistoryModule],
  controllers: [WhatsappController],
  providers: [WhatsappService],
})
export class WhatsappModule {}
