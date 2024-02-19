import {
  Resolver,
  Query,
  ResolveField,
  Args,
  Parent,
  Context,
  Mutation,
} from '@nestjs/graphql';
import { DbPost } from 'src/modules/drizzle/schema';
import { Interaction } from 'src/modules/interaction/model/interaction.model';
import { GetPostInput } from 'src/modules/post/dto/get-post.input';
import { Post } from 'src/modules/post/model/post.model';
import { PostService } from 'src/modules/post/service/post.service';
import { User } from 'src/modules/user/model/user.model';
import { IGraphQLContext } from '../../interfaces/graphQlContext.interface';
import { CreatePostInput } from '../../../post/dto/create-post.input';
import { CurrentUser } from '../../../auth/decorator/currentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../auth/guard/auth.guard';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => Post)
  async getPost(@Args('input') { id }: GetPostInput) {
    const post = await this.postService.getPostById(id);
    return post;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  async createPost(
    @Args('input') input: CreatePostInput,
    @CurrentUser() user: string,
  ) {
    return this.postService.createPost({ userId: user, input });
  }

  @ResolveField(() => [User])
  async author(
    @Parent() parent: DbPost,
    @Context() { loaders }: IGraphQLContext,
  ) {
    return loaders.usersLoader.load(parent.authorId);
  }

  @ResolveField(() => [Comment])
  async comments(
    @Parent() parent: DbPost,
    @Context() { loaders }: IGraphQLContext,
  ) {
    return loaders.postsCommentsLoader.load(parent.id);
  }

  @ResolveField(() => [Interaction])
  async interactions(
    @Parent() parent: DbPost,
    @Context() { loaders }: IGraphQLContext,
  ) {
    return loaders.entitiesInteractionsLoader.load(parent.id);
  }
}
