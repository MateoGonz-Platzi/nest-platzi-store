import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCustomersDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Customer name'})
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Customer lastname'})
  readonly lastname: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Customer email'})
  readonly email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Customer phone'})
  readonly phone: string;
}

export class UpdateCustomersDto extends PartialType(CreateCustomersDto) {}