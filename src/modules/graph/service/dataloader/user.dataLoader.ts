import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { DbUser } from 'src/modules/drizzle/schema';
import { UserService } from 'src/modules/user/service/user.service';

@Injectable()
export class UserDataLoader {
  constructor(private readonly userService: UserService) {}

  private createUsersLoader() {
    return new DataLoader<string, DbUser>(
      async (ids: string[]) => await this.userService.getUsersById(ids),
    );
  }

  private createFriendsLoader() {
    return new DataLoader<string, DbUser[]>(
      async (userIds: string[]) =>
        await this.userService.getFriendsForIds(userIds),
    );
  }

  getLoaders() {
    return {
      usersLoader: this.createUsersLoader(),
      friendsLoader: this.createFriendsLoader(),
    };
  }
}
