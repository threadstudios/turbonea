import { Injectable } from '@nestjs/common';
import { inArray } from 'drizzle-orm';
import { PostgresRepository } from 'src/modules/common/repository/postgres.repository';
import { DbNewPost, DbPost, posts } from 'src/modules/drizzle/schema';

@Injectable()
export class PostRepository extends PostgresRepository<
  typeof posts,
  DbNewPost,
  DbPost
> {
  public table = posts;

  async getPostsByUserIds(userIds: string[]) {
    return this.drizzle.db
      .select()
      .from(posts)
      .where(inArray(posts.authorId, userIds));
  }
}
