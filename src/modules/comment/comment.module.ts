import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { UserModule } from '../user/user.module';
import { CommentResolver } from './resolver/comment.resolver';
import { InteractionModule } from '../interaction/interaction.module';

@Module({
  imports: [forwardRef(() => UserModule), InteractionModule],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
})
export class CommentModule {}
