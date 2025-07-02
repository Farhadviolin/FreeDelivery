import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RedeemRecord {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() userId: string;
  @Column() rewardId: string;
  @Column('int') pointsSpent: number;
  @Column({ default: 'pending' }) status: 'pending' | 'completed' | 'failed';
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
