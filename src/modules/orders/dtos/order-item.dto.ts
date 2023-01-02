import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateOrderItemDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Order indicator' })
  readonly orderId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product indicaator' })
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product quantity' })
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) { }