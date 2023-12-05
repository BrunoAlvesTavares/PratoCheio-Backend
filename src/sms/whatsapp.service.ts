import { Injectable } from '@nestjs/common';
import { Client, ClientOptions } from 'whatsapp-web.js';
import * as qrCodeTerminal from 'qrcode-terminal';
import { UsersService } from '../users/users.service'; // Importe a service de usuários

@Injectable()
export class WhatsappService {
  private client: Client;

  constructor(private readonly usersService: UsersService) {
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
        await chat.sendMessage(completeMessage);
      }
    } catch (error) {
      console.error('Erro ao enviar as mensagens!', error);
    }
  }
}
