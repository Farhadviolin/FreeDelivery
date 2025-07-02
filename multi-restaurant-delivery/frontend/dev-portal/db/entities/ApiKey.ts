import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) key: string;
  @Column() owner: string; // Partner/Entwickler
  @Column('int', { default: 10000 }) quota: number;
  @Column('int', { default: 0 }) usage: number;
  @CreateDateColumn() createdAt: Date;
}
