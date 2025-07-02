import { IsString, Length, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsUUID()
  categoryId: string;
}
