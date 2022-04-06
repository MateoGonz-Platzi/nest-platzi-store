import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}