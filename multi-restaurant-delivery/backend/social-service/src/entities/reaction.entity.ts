import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity('post_reactions')
export class Reaction {
  @Field()
  @PrimaryColumn({ type: 'uuid' })
  postId: string;

  @Field()
  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
