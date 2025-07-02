import { Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity('follows')
export class Follow {
  @Field()
  @PrimaryColumn({ type: 'uuid' })
  followerId: string;

  @Field()
  @PrimaryColumn({ type: 'uuid' })
  followeeId: string;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
