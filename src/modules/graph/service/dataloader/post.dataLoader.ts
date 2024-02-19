import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { DbPost } from 'src/modules/drizzle/schema';
import { PostService } from 'src/modules/post/service/post.service';

@Injectable()
export class PostDataLoader {
  constructor(private readonly postService: PostService) {}

  private createUsersPostsLoader() {
    return new DataLoader<string, DbPost[]>(
      async (userIds: string[]) =>
        await this.postService.getPostsByUserIds(userIds),
    );
  }

  getLoaders() {
    return {
      usersPostsLoader: this.createUsersPostsLoader(),
    };
  }
}
