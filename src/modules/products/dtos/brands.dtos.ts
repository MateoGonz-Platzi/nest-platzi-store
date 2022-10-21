import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Brand name'})
  readonly name: string;

  @IsString()
  @ApiProperty({ description: 'Brand description'})
  readonly description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Brand image'})
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}