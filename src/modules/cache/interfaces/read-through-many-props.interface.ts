import { CacheKeyConfig } from './cache-key-config.interface';

export interface ReadThroughManyProps<Model> {
  parentId: string;
  relationName: string;
  cachKeyConfig: CacheKeyConfig;
  dbGetListFn: () => Promise<Model[]>;
  getIndividualFn: (id: string) => Promise<Model>;
  start?: number;
  end?: number;
}
