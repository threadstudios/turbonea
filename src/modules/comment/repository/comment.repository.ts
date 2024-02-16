import { Injectable } from '@nestjs/common';
import { DbComment, DbNewComment, comments } from '../../drizzle/schema';
import { eq, inArray } from 'drizzle-orm';
import { PostgresRepository } from 'src/modules/common/repository/postgres.repository';

@Injectable()
export class CommentRepository extends PostgresRepository<
  typeof comments,
  DbNewComment,
  DbComment
> {
  public table = comments;

  async getByPostId(postId: string) {
    return this.drizzle.db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId));
  }

  async getByPostIds(postIds: string[]) {
    return this.drizzle.db
      .select()
      .from(comments)
      .where(inArray(comments.postId, postIds));
  }
}
