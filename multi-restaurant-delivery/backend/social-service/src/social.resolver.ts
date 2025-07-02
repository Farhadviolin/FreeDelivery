import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SocialService } from './social.service';
import { Post } from './entities/post.entity';

@Resolver(() => Post)
export class SocialResolver {
  constructor(private svc: SocialService) {}

  @Query(() => [Post])
  feed(@Args('userId') userId: string, @Args('limit') limit: number) {
    return this.svc.getFeed(userId, limit);
  }

  @Mutation(() => Post)
  createPost(@Args('userId') userId: string, @Args('content') content: string) {
    return this.svc.createPost(userId, content);
  }

  @Mutation(() => Boolean)
  react(
    @Args('postId') postId: string,
    @Args('userId') userId: string,
    @Args('type') type: string,
  ) {
    return this.svc.react(postId, userId, type);
  }
}
