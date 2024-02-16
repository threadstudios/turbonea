import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostRepository } from './repository/post.repository';
import { PostCacheService } from './cache/post.cache';

@Module({
  imports: [],
  providers: [PostService, PostRepository, PostCacheService],
  exports: [PostService],
})
export class PostModule {}
