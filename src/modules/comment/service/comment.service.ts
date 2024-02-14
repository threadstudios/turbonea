import { Injectable, Logger } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/service/drizzle.service';
import { DbComment, comments } from '../../drizzle/schema';
import { eq, inArray } from 'drizzle-orm';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);
  constructor(private readonly drizzle: DrizzleService) {}

  async getCommentsByPostId(postId: string) {
    return this.drizzle.db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId));
  }

  async getCommentsByPostIds(postIds: string[]): Promise<DbComment[][]> {
    this.logger.log('Batch fetching Comments');
    const commentResult = await this.drizzle.db
      .select()
      .from(comments)
      .where(inArray(comments.postId, postIds));
    const reduced = commentResult.reduce(
      (acc: Record<string, DbComment[]>, row) => {
        if (!acc[row.postId]) acc[row.postId] = [];
        acc[row.postId].push(row);
        return acc;
      },
      {},
    );
    return postIds.map((id) => reduced[id] || []);
  }
}
