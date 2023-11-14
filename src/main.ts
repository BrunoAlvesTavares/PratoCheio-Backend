import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as http from 'http';
import * as httpProxy from 'http-proxy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura o cors para permitir solicitações da porta 80
  app.use(cors({
    origin: 'http://localhost:80',
    optionsSuccessStatus: 200,
  }));

  // Inicia o servidor na porta 3333
  await app.listen(3333);

  // Cria o proxy para redirecionar para a porta 3333
  const proxy = httpProxy.createProxyServer({});
  const proxyServer = http.createServer((req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3333' });
  });

  // Inicia o proxy na porta 80
  proxyServer.listen(80, () => {
    console.log('Proxy rodando na porta 80');
  });
}

bootstrap();
