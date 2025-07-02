import { IsString, IsEmail, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class GeoDto {
  @IsNumber() lat!: number;
  @IsNumber() lng!: number;
}

export class OnboardDto {
  @IsString() name!: string;
  @IsEmail() email!: string;
  @IsString() phone!: string;
  @IsString() address!: string;
  @ValidateNested() @Type(() => GeoDto) geo!: GeoDto;
  @IsArray() documents!: string[]; // S3-Keys
}
