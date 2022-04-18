import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product name'})
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product description'})
  readonly description: string;

  @IsNumber()
  @IsPositive() //Esto permite validar que el número sea positivo
  @IsNotEmpty()
  @ApiProperty({ description: 'Product price'})
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product stock'})
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product image'})
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @ValidateIf((params) => params.maxPrice)
  @Min(0)
  minPrice: number;  

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;   
}
