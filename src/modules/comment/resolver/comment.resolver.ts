import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { User } from '../../user/model/user.model';
import { UserService } from '../../user/service/user.service';
import { DbPost } from '../../drizzle/schema';
import { Comment } from '../../comment/model/comment.model';
import { InteractionService } from '../../interaction/service/interaction.service';
import { Interaction } from '../../interaction/model/interaction.model';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly userService: UserService,
    private readonly interactionService: InteractionService,
  ) {}

  @ResolveField(() => User)
  async author(@Parent() parent: DbPost) {
    return this.userService.getUserById(parent.authorId);
  }

  @ResolveField(() => [Interaction])
  async interactions(@Parent() parent: DbPost) {
    return this.interactionService.getInteractionsByEntityId(parent.id);
  }
}
