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

  async create(createMerchantDto: CreateMerchantDto): Promise<Merchant> {
    const newMerchant = this.merchantRepository.create(createMerchantDto);
    return this.merchantRepository.save(newMerchant);
  }

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
