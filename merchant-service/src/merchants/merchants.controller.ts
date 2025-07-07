import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { Merchant } from './entities/merchant.entity';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  // Responde à mensagem com o padrão 'create_merchant'
  @MessagePattern({ cmd: 'create_merchant' })
  create(@Payload() createMerchantDto: CreateMerchantDto) {
    return this.merchantsService.create(createMerchantDto);
  }

  @Get()
  async findAll(): Promise<Merchant[]> {
    return this.merchantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Merchant> {
    return this.merchantsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFullMerchantDto: CreateMerchantDto,
  ): Promise<Merchant> {
    return this.merchantsService.update(id, updateFullMerchantDto);
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ): Promise<Merchant> {
    return this.merchantsService.update(id, updateMerchantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.merchantsService.remove(id);
  }
}
