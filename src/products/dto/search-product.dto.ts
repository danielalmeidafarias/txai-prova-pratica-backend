import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class SearchProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  owner_id?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumberString()
  @IsOptional()
  min_price?: number;

  @IsNumberString()
  @IsOptional()
  max_price?: number;
}
