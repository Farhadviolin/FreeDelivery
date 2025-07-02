import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => User, u => u.orders) user: User;
  @Column() status: string;
  @Column({ type: 'timestamptz', default: () => 'NOW()' }) created_at: Date;
}
