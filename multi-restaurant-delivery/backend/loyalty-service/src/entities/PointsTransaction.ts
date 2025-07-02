import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { User } from '../../user-service/src/entities/User'; // ggf. anpassen, falls User-Entity-Pfad anders

export enum PointsTransactionType {
  EARN = 'EARN',
  REDEEM = 'REDEEM',
  ADJUST = 'ADJUST',
}

@Entity()
export class PointsTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ type: 'int' })
  points: number;

  @Column({ type: 'enum', enum: PointsTransactionType })
  type: PointsTransactionType;

  @Column({ nullable: true })
  orderId?: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
