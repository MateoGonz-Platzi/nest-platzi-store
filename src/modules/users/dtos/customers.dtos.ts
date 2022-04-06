import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCustomersDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;
}

export class UpdateCustomersDto extends PartialType(CreateCustomersDto) {}