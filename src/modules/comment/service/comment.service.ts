import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/service/drizzle.service';
import { comments } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CommentService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getCommentsByPostId(postId: string) {
    return this.drizzleService.db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId));
  }
}
