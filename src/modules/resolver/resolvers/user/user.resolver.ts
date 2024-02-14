import {
  Resolver,
  Query,
  ResolveField,
  Mutation,
  Args,
  Parent,
} from '@nestjs/graphql';
import { Post } from 'src/modules/post/model/post.model';
import { PostService } from 'src/modules/post/service/post.service';
import { CreateUserInput } from 'src/modules/user/dto/create-user.input';
import { GetUserInput } from 'src/modules/user/dto/get-user.input';
import { User } from 'src/modules/user/model/user.model';
import { UserService } from 'src/modules/user/service/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Query(() => User)
  async getUser(@Args('input') { id }: GetUserInput) {
    return await this.userService.getUserById(id);
  }

  @Query(() => [User])
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('input') user: CreateUserInput) {
    const newUser = await this.userService.createUser(user);
    return newUser;
  }

  @ResolveField(() => [Post])
  async posts(@Parent() parent: User) {
    return this.postService.getPostsByUserId(parent.id);
  }

  @ResolveField(() => [User])
  async friends(@Parent() parent: User) {
    return await this.userService.getFriends(parent.id);
  }
}
