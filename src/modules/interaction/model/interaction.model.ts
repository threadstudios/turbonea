import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/model/user.model';

@ObjectType()
export class Interaction {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field(() => User)
  author: User;
}
