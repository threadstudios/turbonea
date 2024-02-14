import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './service/post.service';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { InteractionModule } from '../interaction/interaction.module';

@Module({
  imports: [forwardRef(() => UserModule), CommentModule, InteractionModule],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
