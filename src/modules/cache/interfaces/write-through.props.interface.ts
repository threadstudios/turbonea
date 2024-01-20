import { CacheKeyConfig } from './cache-key-config.interface';

export interface WriteThroughProps<Before, After> {
  id: string;
  value: Before;
  cacheKeyConfig: CacheKeyConfig;
  dbWriteFn: () => Promise<After>;
}
