import { Module } from '@nestjs/common';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
