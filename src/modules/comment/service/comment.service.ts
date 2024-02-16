import { Injectable, Logger } from '@nestjs/common';
import { DbComment } from '../../drizzle/schema';
import { CommentRepository } from '../repository/comment.repository';
import { mapResponseToIds } from 'src/modules/common/mapper/mapResponseToIds';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);
  constructor(private readonly commentRepository: CommentRepository) {}

  async getCommentsByPostId(postId: string) {
    return this.commentRepository.getByPostId(postId);
  }

  async getCommentsByPostIds(postIds: string[]): Promise<DbComment[][]> {
    const commentResult = await this.commentRepository.getByPostIds(postIds);
    return mapResponseToIds<DbComment>({
      result: commentResult,
      byKey: 'postId',
      ids: postIds,
    });
  }
}
