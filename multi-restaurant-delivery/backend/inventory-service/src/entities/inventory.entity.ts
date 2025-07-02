import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('inventory')
export class InventoryEntity {
  @Field(() => ID)
  @PrimaryColumn('uuid')
  productId: string;

  @Field(() => Int)
  @Column('bigint')
  available: number;

  @Field(() => Int)
  @Column('bigint', { default: 0 })
  reserved: number;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
