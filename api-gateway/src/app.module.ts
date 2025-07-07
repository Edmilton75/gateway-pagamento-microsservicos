import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MERCHANT_SERVICE',
        transport: Transport.TCP,
        // ATUALIZADO para a porta de mensagens
        options: { host: 'merchant-api', port: 3011 },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        // ATUALIZADO para a porta de mensagens
        options: { host: 'payment-api', port: 3010 },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [],
})
export class AppModule {}
