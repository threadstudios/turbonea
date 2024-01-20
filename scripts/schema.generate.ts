import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { PostResolver } from '../src/modules/post/resolver/post.resolver';
import { CommentResolver } from '../src/modules/comment/resolver/comment.resolver';
import { InteractionResolver } from '../src/modules/interaction/resolver/interaction.resolver';
import { UserResolver } from '../src/modules/user/resolver/user.resolver';
import { printSchema } from 'graphql';
import * as fs from 'fs';

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
