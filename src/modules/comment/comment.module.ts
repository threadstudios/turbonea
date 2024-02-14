import { Module } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { InteractionModule } from '../interaction/interaction.module';

@Module({
  imports: [InteractionModule],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
