import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { DbPost } from 'src/modules/drizzle/schema';
import { Interaction } from 'src/modules/interaction/model/interaction.model';
import { User } from 'src/modules/user/model/user.model';
import { UserService } from 'src/modules/user/service/user.service';

@Resolver(() => Interaction)
export class InteractionResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => User)
  async author(@Parent() parent: DbPost) {
    return this.userService.getUserById(parent.authorId);
  }
}
