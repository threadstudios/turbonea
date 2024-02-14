import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';

import { printSchema } from 'graphql';
import * as fs from 'fs';
import { PostResolver } from 'src/modules/resolver/resolvers/post/post.resolver';
import { CommentResolver } from 'src/modules/resolver/resolvers/comment/comment.resolver';
import { InteractionResolver } from 'src/modules/resolver/resolvers/interaction/interaction.resolver';
import { UserResolver } from 'src/modules/resolver/resolvers/user/user.resolver';

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([
    PostResolver,
    CommentResolver,
    InteractionResolver,
    UserResolver,
  ]);

  fs.writeFileSync(
    `${process.cwd()}/generated/schema.graphql`,
    printSchema(schema),
    'utf-8',
  );
}

generateSchema();
