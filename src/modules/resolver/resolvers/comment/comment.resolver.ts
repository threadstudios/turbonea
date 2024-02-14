import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { DbPost } from 'src/modules/drizzle/schema';
import { Interaction } from 'src/modules/interaction/model/interaction.model';
import { InteractionService } from 'src/modules/interaction/service/interaction.service';
import { User } from 'src/modules/user/model/user.model';
import { UserService } from 'src/modules/user/service/user.service';
import { Comment } from 'src/modules/comment/model/comment.model';

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
