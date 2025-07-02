import { IsString, IsJSON, IsOptional } from 'class-validator';

export class CreateZoneDto {
  @IsString() name!: string;
  @IsJSON() area!: any; // GeoJSON.Polygon
  @IsOptional() @IsJSON() metadata?: any;
}
