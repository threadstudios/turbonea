import { Injectable } from '@nestjs/common';
import { inArray } from 'drizzle-orm';
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
    return this.drizzle.db
      .select()
      .from(posts)
      .where(inArray(posts.authorId, userIds));
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
