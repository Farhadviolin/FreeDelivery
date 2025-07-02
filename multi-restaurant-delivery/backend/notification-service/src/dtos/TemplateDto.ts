import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';

export class TemplateDto {
  @IsEnum(['email', 'sms', 'push', 'webhook']) channel!: 'email' | 'sms' | 'push' | 'webhook';
  @IsString() name!: string;
  @IsString() subjectTemplate!: string;
  @IsString() bodyTemplate!: string;
  @IsOptional() @IsObject() defaults?: any;
}
