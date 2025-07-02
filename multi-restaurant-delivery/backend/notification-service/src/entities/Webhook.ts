import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Webhook {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() event: string;
  @Column() url: string;
  @Column('boolean', { default: true }) active: boolean;
}
