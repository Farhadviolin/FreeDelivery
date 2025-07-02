import { IsUUID, IsString, IsNumber } from 'class-validator';

export class RedeemDto {
  @IsUUID() userId!: string;
  @IsString() code!: string;
  @IsNumber() orderAmount!: number;
}
