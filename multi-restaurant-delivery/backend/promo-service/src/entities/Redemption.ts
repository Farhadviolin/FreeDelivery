import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Redemption {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() userId: string;
  @Column() campaignId: string;
  @Column() code: string;
  @Column('timestamptz') redeemedAt: Date;
}
