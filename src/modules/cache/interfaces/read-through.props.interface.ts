import { CacheKeyConfig } from './cache-key-config.interface';

export interface ReadThroughProps<Model> {
  id: string;
  cacheKeyConfig: CacheKeyConfig;
  dbReadFn: () => Promise<Model>;
}
