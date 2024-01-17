import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetPostInput {
  @Field()
  id: string;
}
