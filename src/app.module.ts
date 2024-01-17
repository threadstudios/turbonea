import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { DrizzleModule } from './modules/drizzle/drizzle.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { InteractionModule } from './modules/interaction/interaction.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      autoSchemaFile: true,
    }),
    DrizzleModule,
    UserModule,
    PostModule,
    CommentModule,
    InteractionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
