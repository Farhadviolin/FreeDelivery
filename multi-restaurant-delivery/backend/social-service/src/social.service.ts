import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Reaction } from './entities/reaction.entity';
import { Follow } from './entities/follow.entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private esClient: ElasticsearchService,
    private redis: RedisService,
  ) {}

  async createPost(userId: string, content: string) {
    const post = this.postRepo.create({ userId, content });
    await this.postRepo.save(post);
    await this.esClient.index({ index: 'posts', document: post });
    return post;
  }

  async getFeed(userId: string, limit: number) {
    const follows = await this.redis.smembers(`follows:${userId}`);
    const { body } = await this.esClient.search({
      index: 'posts',
      body: {
        query: { terms: { user_id: follows } },
        size: limit,
        sort: [{ created_at: 'desc' }],
      },
    });
    return body.hits.hits.map((h) => h._source);
  }

  async react(postId: string, userId: string, type: string) {
    // Upsert reaction in DB and update ES
    // ...
    return true;
  }

  // Moderation: Report, Approve, Block
  async reportPost(postId: string, userId: string, reason: string) {
    // Persist report in Redis for moderation queue
    await this.redis.lpush(
      'moderation:reports',
      JSON.stringify({ postId, userId, reason, reportedAt: new Date().toISOString() }),
    );
    return true;
  }
  async approvePost(postId: string) {
    // Set post as approved in DB
    await this.postRepo.update(postId, { status: 'approved' });
    // Optional: update ES index
    await this.esClient.update({
      index: 'posts',
      id: postId,
      doc: { status: 'approved' },
      doc_as_upsert: true,
    });
    return true;
  }
  async blockPost(postId: string) {
    // Set post as blocked in DB
    await this.postRepo.update(postId, { status: 'blocked' });
    // Optional: update ES index
    await this.esClient.update({
      index: 'posts',
      id: postId,
      doc: { status: 'blocked' },
      doc_as_upsert: true,
    });
    return true;
  }

  // Gamification: Badges, Leaderboard, Points
  async getBadges(userId: string): Promise<string[]> {
    // Beispiel: Badge für ersten Post, Badge für 10+ Reaktionen
    const postCount = await this.postRepo.count({ where: { userId } });
    const reactionCount = await this.postRepo.query(
      `SELECT COUNT(*) FROM post_reactions WHERE userId = $1`,
      [userId],
    );
    const badges = [];
    if (postCount > 0) badges.push('first_post');
    if (reactionCount[0].count >= 10) badges.push('top_reactor');
    return badges;
  }
  async getLeaderboard(): Promise<{ userId: string; total: number }[]> {
    // Leaderboard nach Anzahl Posts
    const result = await this.postRepo.query(
      `SELECT "userId", COUNT(*) as total FROM posts GROUP BY "userId" ORDER BY total DESC LIMIT 10`,
    );
    return result;
  }
  async getPoints(userId: string): Promise<number> {
    // Beispiel: 10 Punkte pro Post, 2 pro Reaktion
    const postCount = await this.postRepo.count({ where: { userId } });
    const reactionCount = await this.postRepo.query(
      `SELECT COUNT(*) FROM post_reactions WHERE userId = $1`,
      [userId],
    );
    return postCount * 10 + Number(reactionCount[0].count) * 2;
  }
}
