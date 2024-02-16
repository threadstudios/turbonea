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
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommonModule } from './modules/common/common.module';
import { AuthModule } from './modules/auth/auth.module';

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
        graphiql: true,
        context: (request, reply) => ({
          loaders: dataLoader.getLoaders(),
        }),
      }),
    }),
    EventEmitterModule.forRoot(),
    DrizzleModule,
    CacheModule,
    UserModule,
    PostModule,
    CommentModule,
    InteractionModule,
    GraphModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
