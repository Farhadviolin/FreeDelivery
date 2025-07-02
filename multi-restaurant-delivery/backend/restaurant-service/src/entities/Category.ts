import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MenuItem } from './MenuItem';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) name: string;
  @OneToMany(() => MenuItem, (item) => item.category) items: MenuItem[];
}
