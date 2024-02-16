import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/modules/cache/service/cache.service';
import { DbInteraction } from 'src/modules/drizzle/schema';

@Injectable()
export class InteractionCacheService extends CacheService<DbInteraction> {
  public cacheKeys = {
    individualKey: (key: string) => `interaction:${key}`,
    listKey: (key: string, subKey: string) => `interaction:${key}:${subKey}`,
  };
}
