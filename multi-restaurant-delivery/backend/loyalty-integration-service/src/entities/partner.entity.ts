import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class PartnerConfig {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @Column() apiType: 'REST' | 'GRPC';
  @Column('json') credentials: any;
  @Column() endpoint: string;
  @CreateDateColumn() createdAt: Date;
}
