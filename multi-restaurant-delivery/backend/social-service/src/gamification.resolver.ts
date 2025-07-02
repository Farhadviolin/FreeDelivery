import { Resolver, Query, Args } from '@nestjs/graphql';
import { SocialService } from './social.service';

@Resolver()
export class GamificationResolver {
  constructor(private svc: SocialService) {}

  @Query(() => [String])
  async badges(@Args('userId') userId: string) {
    return this.svc.getBadges(userId);
  }

  @Query(() => [String])
  async leaderboard() {
    return this.svc.getLeaderboard();
  }

  @Query(() => Number)
  async points(@Args('userId') userId: string) {
    return this.svc.getPoints(userId);
  }
}
