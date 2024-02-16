import { Field, InputType } from '@nestjs/graphql';
import { DbNewUser } from '../../drizzle/schema';

@InputType({ description: 'user' })
export class CreateUserInput implements DbNewUser {
  @Field()
  name: string;

  @Field()
  email?: string;
}
