import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { PostModule } from '../post/post.module';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [PostModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
