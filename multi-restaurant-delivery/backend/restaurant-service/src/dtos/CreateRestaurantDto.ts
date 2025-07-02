import 'reflect-metadata';
import { IsString, Length, IsOptional } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @Length(1, 100)
  name!: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;
}
