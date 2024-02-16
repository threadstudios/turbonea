import { Injectable, Logger } from '@nestjs/common';
import { DbPost } from '../../drizzle/schema';
import { PostRepository } from '../repository/post.repository';
import { mapResponseToIds } from 'src/modules/common/mapper/mapResponseToIds';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(private readonly postRepository: PostRepository) {}

  async getPostsByUserIds(userIds: string[]): Promise<DbPost[][]> {
    const postResult = await this.postRepository.getPostsByUserIds(userIds);
    return mapResponseToIds<DbPost>({
      result: postResult,
      byKey: 'authorId',
      ids: userIds,
    });
  }

  async getPostById(id: string) {
    return this.postRepository.getById(id);
  }
}
