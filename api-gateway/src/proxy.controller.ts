import { All, Controller, Logger, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Controller()
export class ProxyController {
  // Adicionando um Logger para nos ajudar a depurar
  private readonly logger = new Logger(ProxyController.name);
  constructor(private readonly httpService: HttpService) {}

  // O '*' captura todas as rotas (GET, POST, etc.) em qualquer caminho
  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    const { method, path, body, headers } = req;
    const serviceUrl = this.getServiceUrl(path);

    if (!serviceUrl) {
      this.logger.warn(`Serviço não encontrado para o caminho: ${path}`);
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    const targetUrl = `${serviceUrl}${req.path}`;
    this.logger.log(`Redirecionando [${method}] ${path} para -> ${targetUrl}`);

    // Remove o header 'host' para evitar conflitos
    delete headers.host;

    try {
      const serviceResponse = await firstValueFrom(
        this.httpService.request({
          method: method as any,
          url: targetUrl,
          data: body,
          headers: headers,
          timeout: 30000,
        }),
      );

      return res.status(serviceResponse.status).json(serviceResponse.data);
    } catch (error) {
      this.logger.error(`Error ao fazer proxy para ${targetUrl}`, error.stack);

      // Tratamento de erro mais específico e seguro
      if (error instanceof AxiosError && error.response) {
        // Se o erro veio do serviço de destino (ex: um erro 404, 400)
        return res.status(error.response.status).json(error.response.data);
      } else {
        return res.status(502).json({
          message:
            'Bad Gateway: Não foi possível conectar ao serviço de destino.',
          error: error.message,
        });
      }
    }
  }

  private getServiceUrl(path: string): string | null {
    if (path.startsWith('/merchants')) {
      return 'http://merchant-api:3001';
    }
    if (path.startsWith('/payments')) {
      return 'http://payment-api:3000';
    }
    return null;
  }
}
