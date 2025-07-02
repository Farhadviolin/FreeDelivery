import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { Reaction } from './entities/reaction.entity';
import { Follow } from './entities/follow.entity';
import { SocialResolver } from './social.resolver';
import { ModerationResolver } from './moderation.resolver';
import { GamificationResolver } from './gamification.resolver';
import { SocialService } from './social.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Reaction, Follow]),
    GraphQLModule.forRoot({ autoSchemaFile: true }),
  ],
  providers: [SocialResolver, ModerationResolver, GamificationResolver, SocialService],
})
export class SocialModule {}
