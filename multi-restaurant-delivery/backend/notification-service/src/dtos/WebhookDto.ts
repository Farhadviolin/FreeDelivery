import { IsString, IsUrl, IsBoolean, IsOptional } from 'class-validator';

export class WebhookDto {
  @IsString() event!: string;
  @IsUrl() url!: string;
  @IsOptional() @IsBoolean() active?: boolean;
}
