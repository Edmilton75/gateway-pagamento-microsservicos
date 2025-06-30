import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMerchantDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  name: string;

  @IsEmail({}, { message: 'Por favor, forneça um email válido.' })
  @IsNotEmpty({ message: 'O email não pode estar vazio.' })
  email: string;

  @IsString({ message: 'O número do documento deve ser uma string.' })
  @IsNotEmpty({ message: 'O número do documento não pode estar vazio.' })
  documentNumber: string;
}
