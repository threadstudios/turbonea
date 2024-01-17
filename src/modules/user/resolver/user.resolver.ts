import {
  Resolver,
  Query,
  ResolveField,
  Mutation,
  Args,
  Parent,
} from '@nestjs/graphql';
import { User } from '../model/user.model';
import { Post } from '../../post/model/post.model';
import { UserService } from '../service/user.service';
import { CreateUserInput } from '../dto/create-user.input';
import { GetUserInput } from '../dto/get-user.input';
import { PostService } from '../../post/service/post.service';

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
