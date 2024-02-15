import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/modules/cache/service/cache.service';
import { DbUser } from 'src/modules/drizzle/schema';

@Injectable()
export class UserCacheService extends CacheService<DbUser> {
  public cacheKeys = {
    individualKey: (key: string) => `user:${key}`,
    listKey: (key: string, subKey: string) => `user:${key}:${subKey}`,
  };
}
