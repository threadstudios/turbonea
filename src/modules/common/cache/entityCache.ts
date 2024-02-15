import { CacheKeyConfig } from 'src/modules/cache/interfaces/cache-key-config.interface';

export abstract class EntityCache<T> {
  public cacheKeys: CacheKeyConfig<T>;
}
