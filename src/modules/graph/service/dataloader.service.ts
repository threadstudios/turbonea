import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { UserService } from 'src/modules/user/service/user.service';
import {
  DbPost,
  DbUser,
  DbComment,
  DbInteraction,
} from 'src/modules/drizzle/schema';
import { IDataloaders } from '../interfaces/dataloader.interface';
import { PostService } from 'src/modules/post/service/post.service';
import { CommentService } from 'src/modules/comment/service/comment.service';
import { InteractionService } from 'src/modules/interaction/service/interaction.service';

@Injectable()
export class DataLoaderService {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly interactionService: InteractionService,
  ) {}

  getLoaders(): IDataloaders {
    const usersLoader = this.createUsersLoader();
    const friendsLoader = this.createFriendsLoader();
    const usersPostsLoader = this.createUsersPostsLoader();
    const postsCommentsLoader = this.createPostsCommentsLoader();
    const entitiesInteractionsLoader = this.createEntitiesInteractionsLoader();

    return {
      usersLoader,
      friendsLoader,
      usersPostsLoader,
      postsCommentsLoader,
      entitiesInteractionsLoader,
    };
  }

  private createUsersLoader() {
    return new DataLoader<string, DbUser>(
      async (ids: string[]) => await this.userService.getUsersById(ids),
    );
  }

  private createFriendsLoader() {
    return new DataLoader<string, DbUser[]>(
      async (userIds: string[]) =>
        await this.userService.getFriendsForIds(userIds),
    );
  }

  private createUsersPostsLoader() {
    return new DataLoader<string, DbPost[]>(
      async (userIds: string[]) =>
        await this.postService.getPostsByUserIds(userIds),
    );
  }

  private createPostsCommentsLoader() {
    return new DataLoader<string, DbComment[]>(
      async (postIds: string[]) =>
        await this.commentService.getCommentsByPostIds(postIds),
    );
  }

  private createEntitiesInteractionsLoader() {
    return new DataLoader<string, DbInteraction[]>(
      async (entityIds: string[]) =>
        await this.interactionService.getInteractionsByEntityIds(entityIds),
    );
  }
}
