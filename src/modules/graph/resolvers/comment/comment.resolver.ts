import { Resolver, ResolveField, Parent, Context } from '@nestjs/graphql';
import { DbPost } from 'src/modules/drizzle/schema';
import { Interaction } from 'src/modules/interaction/model/interaction.model';
import { User } from 'src/modules/user/model/user.model';
import { Comment } from 'src/modules/comment/model/comment.model';
import { IGraphQLContext } from '../../interfaces/graphQlContext.interface';

@Resolver(() => Comment)
export class CommentResolver {
  constructor() {}

  @ResolveField(() => User)
  async author(
    @Parent() parent: DbPost,
    @Context() { loaders }: IGraphQLContext,
  ) {
    return loaders.usersLoader.load(parent.authorId);
  }

  @ResolveField(() => [Interaction])
  async interactions(
    @Parent() parent: DbPost,
    @Context() { loaders }: IGraphQLContext,
  ) {
    return loaders.entitiesInteractionsLoader.load(parent.id);
  }
}
