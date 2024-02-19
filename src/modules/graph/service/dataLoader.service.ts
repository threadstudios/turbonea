import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { IDataloaders } from '../interfaces/dataloader.interface';
import { UserDataLoader } from './dataloader/user.dataLoader';
import { PostDataLoader } from './dataloader/post.dataLoader';
import { CommentDataLoader } from './dataloader/comment.dataLoader';
import { InteractionDataLoader } from './dataloader/interaction.dataLoader';

@Injectable()
export class DataLoaderService {
  constructor(
    private readonly userDataLoader: UserDataLoader,
    private readonly postDataLoader: PostDataLoader,
    private readonly commentDataLoader: CommentDataLoader,
    private readonly interactionDataLoader: InteractionDataLoader,
  ) {}

  getLoaders(): IDataloaders {
    const usersLoaders = this.userDataLoader.getLoaders();
    const postsLoaders = this.postDataLoader.getLoaders();
    const commentsLoaders = this.commentDataLoader.getLoaders();
    const interactionsLoaders = this.interactionDataLoader.getLoaders();

    return {
      friendsLoader: usersLoaders.friendsLoader,
      usersLoader: usersLoaders.usersLoader,
      usersPostsLoader: postsLoaders.usersPostsLoader,
      postsCommentsLoader: commentsLoaders.postsCommentsLoader,
      entitiesInteractionsLoader:
        interactionsLoaders.entitiesInteractionsLoader,
    };
  }
}
