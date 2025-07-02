import { IsString, IsNotEmpty } from 'class-validator';

export class RedeemRewardDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  rewardId: string;

  @IsString()
  @IsNotEmpty()
  idempotencyKey: string;
}
