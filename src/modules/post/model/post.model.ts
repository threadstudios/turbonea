import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/model/user.model';
import { Comment } from '../../comment/model/comment.model';

@ObjectType({ description: 'post' })
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => User)
  author: User;

  @Field(() => [Comment])
  comments: Comment[];
}
