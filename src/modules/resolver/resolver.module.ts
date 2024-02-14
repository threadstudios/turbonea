import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user/user.resolver';
import { CommentResolver } from './resolvers/comment/comment.resolver';
import { InteractionResolver } from './resolvers/interaction/interaction.resolver';
import { PostResolver } from './resolvers/post/post.resolver';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { InteractionModule } from '../interaction/interaction.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [UserModule, CommentModule, InteractionModule, PostModule],
  providers: [CommentResolver, InteractionResolver, PostResolver, UserResolver],
})
export class ResolverModule {}
