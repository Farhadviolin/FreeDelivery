import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @Column() address: string;
  @Column('text', { array: true, default: [] }) categories: string[];
}
