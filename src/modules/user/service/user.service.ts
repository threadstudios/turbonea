import { UserRepository } from './../repository/user.repository';
import { v4 } from 'uuid';
import { DbNewUser, DbUser, users } from '../../drizzle/schema';
import { DrizzleService } from './../../drizzle/service/drizzle.service';
import { Injectable } from '@nestjs/common';
import { CacheService } from '../../cache/service/cache.service';
import { CacheKeyConfig } from '../../cache/interfaces/cache-key-config.interface';

@Injectable()
export class UserService {
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
    const result = await this.drizzle.db.select().from(users);
    return result;
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
