import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Obter a instância do ConfigService
  const configService = app.get(ConfigService);

  // Obter o valor da porta do ConfigService
  // O segundo argumento é um valor padrão caso a variável não seja encontrada
  const port = configService.get<number>('APP_PORT', 3000);

  // Configurar o ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Lança erro se propriedades extras forem enviadas
      transform: true, // Transforma o payload para o tipo do DTO (ex: string para number, se configurado)
      transformOptions: {
        enableImplicitConversion: true, // Permite conversão implícita baseada no tipo do TS
      },
    }),
  );
  await app.listen(port);
  console.log(`Application is runnig on: ${port}`);
}
bootstrap();
