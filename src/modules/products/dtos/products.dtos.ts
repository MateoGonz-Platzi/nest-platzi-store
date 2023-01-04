import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product name' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product description' })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive() //Esto permite validar que el número sea positivo
  @ApiProperty({ description: 'Product price' })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Product stock' })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product image' })
  readonly image: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product brand' })
  readonly brandId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({ description: 'Product categories' })
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) { }

export class FilterProdutsDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: "Filter limit number of products" })
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ description: "Filter number of products omitted" })
  offset: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: "Filter min price of products" })
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
