import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { UserCacheService } from './cache/user.cache';
import { UserListener } from './listener/user.listener';

@Module({
  imports: [],
  providers: [UserService, UserRepository, UserCacheService, UserListener],
  exports: [UserService],
})
export class UserModule {}
