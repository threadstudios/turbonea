import { UserRepository } from './../repository/user.repository';
import { v4 } from 'uuid';
import { DbNewUser, DbUser, users } from '../../drizzle/schema';
import { DrizzleService } from './../../drizzle/service/drizzle.service';
import { Injectable, Logger } from '@nestjs/common';
import { CacheService } from '../../cache/service/cache.service';
import { CacheKeyConfig } from '../../cache/interfaces/cache-key-config.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly userRepository: UserRepository,
    private readonly cache: CacheService,
  ) {}

  private cacheKeyConfig: CacheKeyConfig = {
    individualKey: (id: string) => `user:${id}`,
    listKey: (id: string, subKey: string) => `user:${id}:${subKey}`,
  };

  async createUser(newUser: DbNewUser): Promise<DbUser> {
    newUser.id = v4();
    return this.cache.writeThrough<DbNewUser, DbUser>({
      id: newUser.id,
      value: newUser,
      dbWriteFn: () => this.userRepository.createUser(newUser),
      cacheKeyConfig: this.cacheKeyConfig,
    });
  }

  async getUserById(id: string): Promise<DbUser> {
    return this.cache.readThrough<DbUser>({
      id,
      dbReadFn: () => this.userRepository.getUserById(id),
      cacheKeyConfig: this.cacheKeyConfig,
    });
  }

  async getUsers(): Promise<DbUser[]> {
    const result = await this.drizzle.db.select({ id: users.id }).from(users);
    const redisResults = await this.cache.getMany<DbUser>(
      result.map((res) => this.cacheKeyConfig.individualKey(res.id)),
    );
    const sortedResults = result.reduce(
      (acc, _item, index) => {
        if (redisResults[index]) {
          acc.resolved.push(redisResults[index]);
        } else {
          acc.nonResolved.push(result[index].id);
        }
        return acc;
      },
      { resolved: [], nonResolved: [] },
    );

    if (!sortedResults.nonResolved.length) {
      return sortedResults.resolved;
    }

    const missing = await this.userRepository.getUsersById(
      sortedResults.nonResolved,
    );
    return [...sortedResults.resolved, ...missing];
  }

  async getUsersById(ids: string[]): Promise<DbUser[]> {
    this.logger.log('Batch fetching Users');
    return this.userRepository.getUsersById(ids);
  }

  async getFriendsForIds(ids: string[]): Promise<DbUser[][]> {
    this.logger.log('Batch fetching Friends (users)');
    return this.userRepository.getFriendsForIds(ids);
  }

  async getFriends(id: string): Promise<any[]> {
    const result = await this.cache.readThroughMany<DbUser>({
      parentId: id,
      relationName: 'friends',
      cachKeyConfig: this.cacheKeyConfig,
      dbGetListFn: () => this.userRepository.getFriends(id),
      getIndividualFn: (id: string) => this.getUserById(id),
    });

    return result;
  }
}
