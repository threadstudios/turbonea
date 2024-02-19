import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user/user.resolver';
import { CommentResolver } from './resolvers/comment/comment.resolver';
import { InteractionResolver } from './resolvers/interaction/interaction.resolver';
import { PostResolver } from './resolvers/post/post.resolver';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { InteractionModule } from '../interaction/interaction.module';
import { PostModule } from '../post/post.module';
import { DataLoaderService } from './service/dataLoader.service';
import { AuthModule } from '../auth/auth.module';
import { UserDataLoader } from './service/dataloader/user.dataLoader';
import { PostDataLoader } from './service/dataloader/post.dataLoader';
import { CommentDataLoader } from './service/dataloader/comment.dataLoader';
import { InteractionDataLoader } from './service/dataloader/interaction.dataLoader';

@Module({
  imports: [
    UserModule,
    CommentModule,
    InteractionModule,
    PostModule,
    AuthModule,
  ],
  providers: [
    CommentResolver,
    InteractionResolver,
    PostResolver,
    UserResolver,
    DataLoaderService,
    UserDataLoader,
    PostDataLoader,
    CommentDataLoader,
    InteractionDataLoader,
  ],
  exports: [DataLoaderService],
})
export class GraphModule {}
