import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './Order';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) email: string;
  @Column() passwordHash: string;
  @Column('text', { array: true, default: ['customer'] }) roles: string[];
  @OneToMany(() => Order, o => o.user) orders: Order[];
}
