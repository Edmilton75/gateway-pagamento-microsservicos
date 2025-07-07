import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices'; // Importe o Transport

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Conecta o microserviço para ouvir mensagens do Gateway
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3010, // <-- PORTA INTERNA SÓ PARA MENSAGENS
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Inicia ambos os ouvintes (HTTP e TCP)
  await app.startAllMicroservices();
  await app.listen(3000); // Continua ouvindo HTTP na mesma porta
  console.log(
    'Payment service is running and listening for messages on port 3000',
  );
}
bootstrap();
