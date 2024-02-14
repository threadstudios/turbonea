import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { DrizzleModule } from './modules/drizzle/drizzle.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { InteractionModule } from './modules/interaction/interaction.module';
import { CacheModule } from './modules/cache/cache.module';
import { GraphModule } from './modules/graph/graph.module';
import { DataLoaderService } from './modules/graph/service/dataLoader.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      imports: [GraphModule],
      inject: [DataLoaderService],
      useFactory: async (dataLoader: DataLoaderService) => ({
        buildSchemaOptions: {
          numberScalarMode: 'integer',
        },
        autoSchemaFile: true,
        context: (request, reply) => ({
          loaders: dataLoader.getLoaders(),
        }),
      }),
    }),
    DrizzleModule,
    CacheModule,
    UserModule,
    PostModule,
    CommentModule,
    InteractionModule,
    GraphModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
