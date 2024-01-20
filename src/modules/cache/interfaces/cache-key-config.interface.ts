export interface CacheKeyConfig {
  individualKey: (id: string) => string;
  listKey: (id: string, subKey: string) => string;
}
