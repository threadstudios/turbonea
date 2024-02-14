import { Resolver, Query, ResolveField, Args, Parent } from '@nestjs/graphql';
import { CommentService } from 'src/modules/comment/service/comment.service';
import { DbPost } from 'src/modules/drizzle/schema';
import { Interaction } from 'src/modules/interaction/model/interaction.model';
import { InteractionService } from 'src/modules/interaction/service/interaction.service';
import { GetPostInput } from 'src/modules/post/dto/get-post.input';
import { Post } from 'src/modules/post/model/post.model';
import { PostService } from 'src/modules/post/service/post.service';
import { User } from 'src/modules/user/model/user.model';
import { UserService } from 'src/modules/user/service/user.service';

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
