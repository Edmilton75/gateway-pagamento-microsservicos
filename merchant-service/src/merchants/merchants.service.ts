import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from './entities/merchant.entity';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private readonly merchantRepository: Repository<Merchant>,
  ) {}

  // async create(createMerchantDto: CreateMerchantDto): Promise<Merchant> {
  //   const newMerchant = this.merchantRepository.create(createMerchantDto);
  //   return this.merchantRepository.save(newMerchant);
  // }
  // async create(createMerchantDto: CreateMerchantDto): Promise<Merchant> {
  //   console.log('[MerchantsService] Tentando criar no banco...');
  //   const newMerchant = this.merchantRepository.create(createMerchantDto);
  //   const saved = await this.merchantRepository.save(newMerchant);
  //   console.log('[MerchantsService] Salvo com sucesso!');
  //   return saved;
  // }
  // testFast() {
  //   console.log(
  //     '[MerchantsService] Rota de teste rápido acessada! Sem banco de dados.',
  //   );
  //   return { status: 'A rota de teste rápido funcionou!' };
  // }
  async create(createMerchantDto: CreateMerchantDto): Promise<any> {
    // Por enquanto, vamos manter a lógica do banco comentada
    // const newMerchant = this.merchantRepository.create(createMerchantDto);
    // return this.merchantRepository.save(newMerchant);

    console.log('[DEBUG] Rota create acessada. Retornando resposta direta.');
    return {
      message: 'Serviço do lojista respondendo diretamente!',
      dataReceived: createMerchantDto,
    };
  }

  // async create(createMerchantDto: CreateMerchantDto): Promise<any> {
  //   console.log(
  //     '[DEBUG] Chegou no create do merchant-service! Retornando resposta de teste.',
  //   );
  //   return {
  //     message: 'Teste de resposta rápida OK!',
  //     dataReceived: createMerchantDto,
  //   };
  // }

  async findAll(): Promise<Merchant[]> {
    return this.merchantRepository.find();
  }

  async findOne(id: string): Promise<Merchant> {
    const merchant = await this.merchantRepository.findOne({ where: { id } });
    if (!merchant) {
      throw new NotFoundException(`Merchant with ID "${id}" not found`);
    }
    return merchant;
  }

  async update(
    id: string,
    updateMerchantDto: UpdateMerchantDto | CreateMerchantDto,
  ): Promise<Merchant> {
    const merchant = await this.merchantRepository.preload({
      id: id,
      ...updateMerchantDto,
    });
    if (!merchant) {
      throw new NotFoundException(`Merchant with ID "${id}" not found`);
    }
    return this.merchantRepository.save(merchant);
  }

  async remove(id: string): Promise<void> {
    const result = await this.merchantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Merchant with ID "${id}" not found`);
    }
  }
}
