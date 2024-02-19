import { Injectable } from '@nestjs/common';
import { inArray, sql, between, and } from 'drizzle-orm';
import { PostgresRepository } from 'src/modules/common/repository/postgres.repository';
import { DbNewPost, DbPost, posts } from 'src/modules/drizzle/schema';
import { CreatePostInput } from '../dto/create-post.input';

@Injectable()
export class PostRepository extends PostgresRepository<
  typeof posts,
  DbNewPost,
  DbPost
> {
  public table = posts;

  async getPostsByUserIds(userIds: string[]) {
    const sq = this.drizzle.db
      .select({
        id: posts.id,
        content: posts.content,
        authorId: posts.authorId,
        rn: sql`ROW_NUMBER() OVER (
            PARTITION BY
              author_id
              )`.as('rn'),
      })
      .from(posts)
      .as('sq');
    const test = await this.drizzle.db
      .select()
      .from(sq)
      .where(({ rn }) => and(inArray(sq.authorId, userIds), between(rn, 1, 2)));

    return test;
  }

  async createPost(id: string, content: CreatePostInput, userId: string) {
    const results = await this.drizzle.db
      .insert(posts)
      .values({
        id,
        content: content.content,
        authorId: userId,
      })
      .returning();
    return results[0];
  }
}
