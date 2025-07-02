import { IsString, IsObject, IsEnum } from 'class-validator';

export class SendDto {
  @IsEnum(['email', 'sms', 'push', 'webhook']) channel!: 'email' | 'sms' | 'push' | 'webhook';
  @IsString() recipient!: string;
  @IsString() templateName!: string;
  @IsObject() data!: any;
}
