import { Controller, Post, Body, Inject, Get, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';

@Controller()
export class GatewayController {
  constructor(
    @Inject('MERCHANT_SERVICE') private readonly merchantClient: ClientProxy,
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) {}

  @Post('merchants')
  createMerchant(@Body() createMerchantDto: any) {
    // Envia uma mensagem e espera a resposta
    return this.merchantClient
      .send({ cmd: 'create_merchant' }, createMerchantDto)
      .pipe(timeout(5000)); // Espera 5 segundos pela resposta
  }

  @Post('payments')
  createPayment(@Body() createPaymentDto: any) {
    return this.paymentClient
      .send({ cmd: 'create_payment' }, createPaymentDto)
      .pipe(timeout(5000));
  }
}
