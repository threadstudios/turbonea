import { Injectable, Logger } from '@nestjs/common';
import { DbPost } from '../../drizzle/schema';
import { PostRepository } from '../repository/post.repository';
import { mapResponseToIds } from 'src/modules/common/mapper/mapResponseToIds';
import { CreatePostInput } from '../dto/create-post.input';
import { PostCacheService } from '../cache/post.cache';
import { v4 } from 'uuid';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postCache: PostCacheService,
  ) {}

  async getPostsByUserIds(userIds: string[]): Promise<DbPost[][]> {
    const postResult = await this.postRepository.getPostsByUserIds(userIds);
    return mapResponseToIds<DbPost>({
      result: postResult,
      byKey: 'authorId',
      ids: userIds,
    });
  }

  async createPost({
    userId,
    input,
  }: {
    userId: string;
    input: CreatePostInput;
  }) {
    const id = v4();
    try {
      const creates = await Promise.all([
        this.postCache.createPost(id, input, userId),
        this.postRepository.create({ id, ...input, authorId: userId }),
      ]);

      return creates[1];
    } catch (e) {
      throw e;
    }
  }

  async getPostById(id: string) {
    return this.postRepository.getById(id);
  }
}
