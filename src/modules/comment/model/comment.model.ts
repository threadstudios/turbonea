import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/model/user.model';
import { Interaction } from '../../interaction/model/interaction.model';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => User)
  author: User;

  @Field(() => [Interaction])
  interactions: Interaction[];
}
