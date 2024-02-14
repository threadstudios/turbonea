import DataLoader from 'dataloader';
import {
  DbUser,
  DbPost,
  DbComment,
  DbInteraction,
} from 'src/modules/drizzle/schema';

export interface IDataloaders {
  usersLoader: DataLoader<string, DbUser>;
  friendsLoader: DataLoader<string, DbUser[]>;
  usersPostsLoader: DataLoader<string, DbPost[]>;
  postsCommentsLoader: DataLoader<string, DbComment[]>;
  entitiesInteractionsLoader: DataLoader<string, DbInteraction[]>;
}
