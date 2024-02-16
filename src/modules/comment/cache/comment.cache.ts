import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/modules/cache/service/cache.service';
import { DbInteraction } from 'src/modules/drizzle/schema';

@Injectable()
export class CommentCacheService extends CacheService<DbInteraction> {
  public cacheKeys = {
    individualKey: (key: string) => `comment:${key}`,
    listKey: (key: string, subKey: string) => `comment:${key}:${subKey}`,
  };
}
