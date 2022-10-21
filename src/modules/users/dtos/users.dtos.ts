import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsPositive
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The user email'})
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The user lastname'})
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The user password'})
  readonly password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The user email'})
  readonly email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The user phone'})
  readonly phone: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'The customer Id'})
  customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}