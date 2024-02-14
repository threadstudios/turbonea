import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { createClient } from 'redis';
import { ReadThroughManyProps } from '../interfaces/read-through-many-props.interface';
import { WriteThroughProps } from '../interfaces/write-through.props.interface';
import { ReadThroughProps } from '../interfaces/read-through.props.interface';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private cache: ReturnType<typeof createClient>;
  private readonly logger = new Logger(CacheService.name);

  async onModuleInit() {
    this.cache = createClient({
      url: `redis://localhost:16379`,
    });
    await this.cache.connect();
  }

  async onModuleDestroy() {
    await this.cache.disconnect();
  }

  private async get<Model>(key: string): Promise<Model | undefined> {
    const result = this.cache.json.get(key);
    if (!result) return;
    return result as Model;
  }

  private async set(key: string, value: Record<any, any>) {
    this.cache.json.set(key, '$', value);
  }

  private async getList(key: string, start?: number, end?: number) {
    const exists = await this.cache.exists(key);
    if (!exists) return;
    const result = await this.cache.lRange(key, start, end);
    return result;
  }

  private async addToList(key: string, value: string) {
    await this.cache.rPush(key, value);
  }

  async getMany<Model>(keys: string[]): Promise<Model[]> {
    const result = await this.cache.json.mGet(keys, '.');
    return result as Model[];
  }

  async writeThrough<Before, After>({
    id,
    value,
    dbWriteFn,
    cacheKeyConfig,
  }: WriteThroughProps<Before, After>) {
    const key = cacheKeyConfig.individualKey(id);
    await this.set(key, value);
    try {
      const result = await dbWriteFn();
      return result;
    } catch (e) {
      this.cache.json.del(key);
      throw e;
    }
  }

  async readThrough<Model>({
    id,
    cacheKeyConfig,
    dbReadFn,
  }: ReadThroughProps<Model>) {
    const key = cacheKeyConfig.individualKey(id);
    this.logger.log(`readThrough: ${key}`);
    const cached = await this.get<Model>(key);
    if (cached) return cached;
    this.logger.log(`readThrough: ${key} cache miss`);
    const result = await dbReadFn();
    this.logger.log(`Result`, result);
    await this.set(key, result);
    return result;
  }

  async readThroughMany<Model extends { id: string }>({
    parentId,
    relationName,
    start = 0,
    end = -1,
    dbGetListFn,
    getIndividualFn,
    cachKeyConfig,
  }: ReadThroughManyProps<Model>) {
    const listKey = cachKeyConfig.listKey(parentId, relationName);
    this.logger.log(`readThroughMany: ${listKey}`);
    const cachedList = await this.getList(listKey, start, end);
    if (cachedList) {
      const cached = await Promise.all(
        cachedList.map((id) => getIndividualFn(id)),
      );
      if (cached) return cached;
    }
    this.logger.log(`readThroughMany: ${listKey} cache miss`);
    const allResults = await dbGetListFn();
    const result = await Promise.all(
      allResults.map(async (individualEntity) => {
        const itemKey = cachKeyConfig.individualKey(individualEntity.id);
        await this.set(itemKey, individualEntity);
        await this.addToList(listKey, individualEntity.id);
        return individualEntity;
      }),
    );
    return result;
  }
}
