import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NotificationTemplate {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() channel: 'email' | 'sms' | 'push' | 'webhook';
  @Column() name: string;
  @Column('text') subjectTemplate: string;
  @Column('text') bodyTemplate: string;
  @Column('jsonb', { nullable: true }) defaults: any;
}
