import { UserRepository } from './../repository/user.repository';
import { DbNewUser, DbUser, users } from '../../drizzle/schema';
import { DrizzleService } from './../../drizzle/service/drizzle.service';
import { Injectable, Logger } from '@nestjs/common';
import { UserCacheService } from '../cache/user.cache';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserEvents } from '../user.events';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly userRepository: UserRepository,
    private readonly userCache: UserCacheService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createUser(newUser: DbNewUser): Promise<DbUser> {
    const user = await this.userRepository.createUser(newUser);
    this.eventEmitter.emit(UserEvents.UserCreated, { id: user.id });
    return user;
  }

  async getUserById(id: string): Promise<DbUser> {
    return this.userRepository.getUserById(id);
  }

  async getUsers(): Promise<DbUser[]> {
    const result = await this.drizzle.db.select({ id: users.id }).from(users);
    const redisResults = await this.userCache.getMany<DbUser>(
      result.map((res) => res.id),
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
}
