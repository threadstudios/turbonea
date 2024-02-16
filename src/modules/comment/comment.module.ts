import { Module } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { CommentRepository } from './repository/comment.repository';
import { CommentCacheService } from './cache/comment.cache';

@Module({
  imports: [],
  providers: [CommentService, CommentRepository, CommentCacheService],
  exports: [CommentService],
})
export class CommentModule {}
