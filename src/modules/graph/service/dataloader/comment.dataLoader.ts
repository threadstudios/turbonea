import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { CommentService } from 'src/modules/comment/service/comment.service';
import { DbComment } from 'src/modules/drizzle/schema';

@Injectable()
export class CommentDataLoader {
  constructor(private readonly commentService: CommentService) {}

  private createPostsCommentsLoader() {
    return new DataLoader<string, DbComment[]>(
      async (postIds: string[]) =>
        await this.commentService.getCommentsByPostIds(postIds),
    );
  }

  getLoaders() {
    return {
      postsCommentsLoader: this.createPostsCommentsLoader(),
    };
  }
}
