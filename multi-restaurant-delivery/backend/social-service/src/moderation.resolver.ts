import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SocialService } from './social.service';

@Resolver()
export class ModerationResolver {
  constructor(private svc: SocialService) {}

  @Mutation(() => Boolean)
  async reportPost(
    @Args('postId') postId: string,
    @Args('userId') userId: string,
    @Args('reason') reason: string,
  ) {
    return this.svc.reportPost(postId, userId, reason);
  }

  @Mutation(() => Boolean)
  async approvePost(@Args('postId') postId: string) {
    return this.svc.approvePost(postId);
  }

  @Mutation(() => Boolean)
  async blockPost(@Args('postId') postId: string) {
    return this.svc.blockPost(postId);
  }
}
