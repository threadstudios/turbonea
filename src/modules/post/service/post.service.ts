import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/service/drizzle.service';
import { posts } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PostService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getPostsByUserId(userId: string) {
    return this.drizzleService.db
      .select()
      .from(posts)
      .where(eq(posts.authorId, userId));
  }

  async getPostById(id: string) {
    const postResults = await this.drizzleService.db
      .select()
      .from(posts)
      .where(eq(posts.id, id));
    return postResults[0];
  }
}
