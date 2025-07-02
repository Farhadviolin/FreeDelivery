import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) name: string;
  @Column({ nullable: true }) brandingColor?: string;
  @Column({ nullable: true }) logoUrl?: string;
  @CreateDateColumn() createdAt: Date;
}
