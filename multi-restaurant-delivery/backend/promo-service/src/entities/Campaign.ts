import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @Column('jsonb') rules: any; // z.B. { minAmount:30, discountPercent:10, codes: string[] }
  @Column('timestamptz') startAt: Date;
  @Column('timestamptz') endAt: Date;
  @Column({ default: true }) active: boolean;
}
