import { Injectable, Logger } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/service/drizzle.service';
import { DbPost, posts } from '../../drizzle/schema';
import { eq, inArray } from 'drizzle-orm';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(private readonly drizzle: DrizzleService) {}

  async getPostsByUserId(userId: string) {
    return this.drizzle.db
      .select()
      .from(posts)
      .where(eq(posts.authorId, userId));
  }

  async getPostsByUserIds(userIds: string[]): Promise<DbPost[][]> {
    this.logger.log('Batch fetching Posts');
    const postResult = await this.drizzle.db
      .select()
      .from(posts)
      .where(inArray(posts.authorId, userIds));
    const reduced = postResult.reduce((acc: Record<string, DbPost[]>, row) => {
      if (!acc[row.authorId]) acc[row.authorId] = [];
      acc[row.authorId].push(row);
      return acc;
    }, {});
    return userIds.map((id) => reduced[id] || []);
  }

  async getPostById(id: string) {
    const postResults = await this.drizzle.db
      .select()
      .from(posts)
      .where(eq(posts.id, id));
    return postResults[0];
  }
}
