import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from '../../post/model/post.model';
import { DbUser } from '../../drizzle/schema';

@ObjectType({ description: 'user' })
export class User implements DbUser {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [User])
  friends: User[];

  @Field(() => [Post])
  posts: Post[];
}
