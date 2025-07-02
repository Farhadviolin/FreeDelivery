import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @Column('text', { nullable: true }) description?: string;
  @Column('decimal') price: number;
  @ManyToOne(() => Category, (cat) => cat.items) category: Category;
}
