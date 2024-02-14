import {
  Resolver,
  Query,
  ResolveField,
  Mutation,
  Args,
  Parent,
  Context,
} from '@nestjs/graphql';
import { Post } from 'src/modules/post/model/post.model';
import { CreateUserInput } from 'src/modules/user/dto/create-user.input';
import { GetUserInput } from 'src/modules/user/dto/get-user.input';
import { User } from 'src/modules/user/model/user.model';
import { UserService } from 'src/modules/user/service/user.service';
import { IGraphQLContext } from '../../interfaces/graphQlContext.interface';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Args('input') { id }: GetUserInput) {
    return await this.userService.getUserById(id);
  }

  @Query(() => [User])
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Mutation(() => User)
  async createUser(@Args('input') user: CreateUserInput) {
    const newUser = await this.userService.createUser(user);
    return newUser;
  }

  @ResolveField(() => [Post])
  async posts(@Parent() parent: User, @Context() { loaders }: IGraphQLContext) {
    return loaders.usersPostsLoader.load(parent.id);
  }

  @ResolveField(() => [User])
  async friends(
    @Parent() parent: User,
    @Context() { loaders }: IGraphQLContext,
  ) {
    return loaders.friendsLoader.load(parent.id);
  }
}
