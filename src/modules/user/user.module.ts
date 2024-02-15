import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { PostModule } from '../post/post.module';
import { UserRepository } from './repository/user.repository';
import { UserCacheService } from './cache/user.cache';
import { UserListener } from './listener/user.listener';

@Module({
  imports: [PostModule],
  providers: [UserService, UserRepository, UserCacheService, UserListener],
  exports: [UserService],
})
export class UserModule {}
