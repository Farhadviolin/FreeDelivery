import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() userId: string;
  @Column() stripeSubscriptionId: string;
  @Column({ type: 'timestamp' }) currentPeriodEnd: Date;
  @Column({ default: true }) active: boolean;
}
