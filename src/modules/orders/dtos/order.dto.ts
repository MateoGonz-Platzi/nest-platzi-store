import { OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate, IsMongoId, IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  /* @Type(() => ProductsToOrderDto)
  @ValidateNested({ each: true }) //validate an array of objects
  readonly products: ProductsToOrderDto[]; */
  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}
export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) { }

//DTO Product and quantity
export class AddProductsToOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}

/* export class ProductsToOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly product: string[];

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly quantity: number;
} */
//Add product to order
/* export class AddProductsToOrderDto {
  @Type(() => ProductsToOrderDto)
  @ValidateNested({ each: true }) //validate an array of objects
  readonly products: ProductsToOrderDto[];
} */