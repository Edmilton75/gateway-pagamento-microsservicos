import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  // O decorador @EventPattern diz ao Nest para chamar este método
  // sempre que um evento com o padrão 'payment_created' chegar na fila.
  @EventPattern('payment_created')
  handlePaymentCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log('--- Notificação Recebida! ---');
    console.log(`[Notification-Service] Evento 'payment_created' recebido.`);
    console.log(`[Notification-Service] Dados do Pagamento:`, data);

    // Aqui viria a sua lógica de negócio:
    // - Enviar um email de confirmação para o cliente
    // - Enviar uma notificação push para o app
    // - etc.

    // Isso confirma para o RabbitMQ que a mensagem foi processada com sucesso
    // e pode ser removida da fila. Se ocorrer um erro antes desta linha,
    // a mensagem voltará para a fila para ser processada novamente.
    channel.ack(originalMsg);
    console.log('--- Fim da Notificação ---');
  }
}
