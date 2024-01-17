import { Resolver, Query, ResolveField, Args, Parent } from '@nestjs/graphql';
import { Post } from '../model/post.model';
import { PostService } from '../../post/service/post.service';
import { GetPostInput } from '../dto/get-post.input';
import { User } from '../../user/model/user.model';
import { UserService } from '../../user/service/user.service';
import { DbPost } from '../../drizzle/schema';
import { Comment } from '../../comment/model/comment.model';
import { CommentService } from '../../comment/service/comment.service';
import { InteractionService } from '../../interaction/service/interaction.service';
import { Interaction } from '../../interaction/model/interaction.model';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly interactionService: InteractionService,
    private readonly userService: UserService,
  ) {}

  @Query(() => Post)
  async getPost(@Args('input') { id }: GetPostInput) {
    const post = await this.postService.getPostById(id);
    return post;
  }

  @ResolveField(() => [User])
  async author(@Parent() parent: DbPost) {
    return this.userService.getUserById(parent.authorId);
  }

  @ResolveField(() => [Comment])
  async comments(@Parent() parent: DbPost) {
    return this.commentService.getCommentsByPostId(parent.id);
  }

  @ResolveField(() => [Interaction])
  async interactions(@Parent() parent: DbPost) {
    return this.interactionService.getInteractionsByEntityId(parent.id);
  }
}
