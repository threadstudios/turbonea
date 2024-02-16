import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/modules/cache/service/cache.service';
import { DbPost } from 'src/modules/drizzle/schema';

@Injectable()
export class PostCacheService extends CacheService<DbPost> {
  public cacheKeys = {
    individualKey: (key: string) => `post:${key}`,
    listKey: (key: string, subKey: string) => `post:${key}:${subKey}`,
  };
}
