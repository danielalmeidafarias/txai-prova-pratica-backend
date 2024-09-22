import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  price?: number;

  @ApiPropertyOptional()
  quantity?: number;
}
