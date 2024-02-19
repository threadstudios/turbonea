import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/modules/cache/service/cache.service';
import { DbPost } from 'src/modules/drizzle/schema';
import { CreatePostInput } from '../dto/create-post.input';

@Injectable()
export class PostCacheService extends CacheService<DbPost> {
  public cacheKeys = {
    individualKey: (key: string) => `post:${key}`,
    listKey: (key: string, subKey: string) => `post:${key}:${subKey}`,
  };

  async createPost(id: string, content: CreatePostInput, userId: string) {
    const post = {
      id,
      content,
      authorId: userId,
    };
    return Promise.all([
      this.set(id, post),
      this.setList(id, 'comments', []),
      this.setList(id, 'interactions', []),
    ]);
  }
}
