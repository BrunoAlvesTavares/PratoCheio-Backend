import { Injectable } from '@nestjs/common';
import { Client, ClientOptions } from 'whatsapp-web.js';
import * as qrCodeTerminal from 'qrcode-terminal';
import { UsersService } from '../users/users.service';
import { MessagehistoryService } from '../messagehistory/messagehistory.service';

@Injectable()
export class WhatsappService {
  private client: Client;

  constructor(
    private readonly usersService: UsersService,
    private readonly messageHistoryService: MessagehistoryService,
  ) {
    const options: ClientOptions = {};

    this.client = new Client(options);

    this.client.on('qr', (qr) => {
      qrCodeTerminal.generate(qr, { small: true });
    });

    this.client.on('ready', async () => {
      try {
        console.log('Conexão feita!');
      } catch (error) {
        console.error('Erro durante a conexão:', error);
      }
    });

    this.client
      .initialize()
      .then(() => {
        console.log('Cliente inicializado com sucesso.');
      })
      .catch((error) => {
        console.error('Erro durante a inicialização do cliente:', error);
      });
  }

  private formatPhoneNumber(phone: string): string {
    return phone.replace(/\s/g, '');
  }

  async sendMessagesToUsers(messageData) {
    try {
      const users: any[] = await this.usersService.findPhoneNumbers();
      const phoneNumbers = users.map((user) => user.phone);

      for (const phoneNumber of phoneNumbers) {
        const formattedPhone = this.formatPhoneNumber(phoneNumber);
        const chat = await this.client.getChatById(`${formattedPhone}@c.us`);
        const completeMessage = `A instituição ${messageData.institutionName} informa: ${messageData.message}`;
        await this.saveMessageToHistory(
          messageData.institutionName,
          completeMessage,
        );
        await chat.sendMessage(completeMessage);
      }
    } catch (error) {
      console.error('Erro ao enviar as mensagens!', error);
    }
  }

  private async saveMessageToHistory(institutionName: string, message: string) {
    try {
      const messageHistoryData = {
        nameInstituiton: institutionName,
        message: message,
        createdAt: new Date(),
      };
      await this.messageHistoryService.create(messageHistoryData);
    } catch (error) {
      console.error('Erro ao salvar a mensagem no histórico!', error);
    }
  }
}
