import { Injectable } from '@nestjs/common';
import { Client, ClientOptions } from 'whatsapp-web.js';
import * as qrCodeTerminal from 'qrcode-terminal';
import { UsersService } from '../users/users.service'; // Importe a service de usuários

@Injectable()
export class WhatsappService {
  private client: Client;

  constructor(private readonly usersService: UsersService) {
    try {
      const options: ClientOptions = {};

      this.client = new Client(options);

      this.client.on('qr', (qr) => {
        qrCodeTerminal.generate(qr, { small: true });
      });

      this.client.on('ready', async () => {
        console.log('Conexão feita!');
      });

      this.client.initialize();
    } catch (error) {
      console.error('Erro ao inicializar o cliente WhatsApp:', error);
    }
  }

  private formatPhoneNumber(phone: string): string {
    return phone.replace(/\s/g, '');
  }

  async sendMessagesToUsers(message) {
    try {
      const users: any[] = await this.usersService.findPhoneNumbers();
      const phoneNumbers = users.map((user) => user.phone);

      for (const phoneNumber of phoneNumbers) {
        const formattedPhone = this.formatPhoneNumber(phoneNumber);
        console.log(formattedPhone);
        const chat = await this.client.getChatById(`${formattedPhone}@c.us`);
        await chat.sendMessage(message);
      }
    } catch (error) {
      console.error('Erro ao enviar as mensagens!', error);
    }
  }
}
