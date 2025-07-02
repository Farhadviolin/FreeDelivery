import { IsString } from 'class-validator';

export class ListRewardsDto {
  @IsString()
  userId: string;
}
