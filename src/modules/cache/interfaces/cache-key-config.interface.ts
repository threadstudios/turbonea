export interface CacheKeyConfig<Model> {
  individualKey: (key: string) => string;
  listKey: (key: string, subKey: string) => string;
}
