import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { User } from '../../user/model/user.model';
import { UserService } from '../../user/service/user.service';
import { DbPost } from '../../drizzle/schema';
import { Interaction } from '../../interaction/model/interaction.model';

@Resolver(() => Interaction)
export class InteractionResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => User)
  async author(@Parent() parent: DbPost) {
    return this.userService.getUserById(parent.authorId);
  }
}
