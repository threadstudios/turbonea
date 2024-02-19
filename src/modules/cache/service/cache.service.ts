import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { createClient } from 'redis';
import { EntityCache } from 'src/modules/common/cache/entityCache';

type RedisJSON = null | boolean | number | string | Date | RedisJSONObject;
interface RedisJSONObject {
  [key: string]: RedisJSON;
  [key: number]: RedisJSON;
}

@Injectable()
export class CacheService<Model extends RedisJSONObject>
  extends EntityCache<Model>
  implements OnModuleInit, OnModuleDestroy
{
  private redis: ReturnType<typeof createClient>;
  private readonly logger = new Logger(CacheService.name);

  async onModuleInit() {
    this.redis = createClient({
      url: process.env.REDIS_URL,
    });
    await this.redis.connect();
  }

  async onModuleDestroy() {
    await this.redis.disconnect();
  }

  async get<Model>(key: string): Promise<Model | undefined> {
    const completeKey = this.cacheKeys.individualKey(key);
    this.logger.log('Executed Redis Get');
    const result = this.redis.json.get(
      this.cacheKeys.individualKey(completeKey),
    );
    if (!result) return;
    return result as Model;
  }

  async set(key: string, value: Record<string, any>) {
    return this.redis.json.set(this.cacheKeys.individualKey(key), '$', value);
  }

  async setList(key: string, subkey: string, value: any[]) {
    return this.redis.json.set(this.cacheKeys.listKey(key, subkey), '$', value);
  }

  async getList(key: string, subkey: string): Promise<Model[] | undefined> {
    const result = this.redis.json.get(this.cacheKeys.listKey(key, subkey));
    if (!result) {
      return;
    }
    return result as unknown as Model[];
  }

  async addToList(key: string, value: string) {
    await this.redis.rPush(key, value);
  }

  async getMany<Model>(ids: string[]): Promise<Model[]> {
    const keys = ids.map((id) => this.cacheKeys.individualKey(id));
    const result = await this.redis.json.mGet(keys, '.');
    this.logger.log('Executed Redis MGET');
    return result as Model[];
  }

  async setMany(records: Record<string, any>[]) {
    this.logger.log('Executed Redis MSET');
    return this.redis.json.mSet(
      records.map((record) => {
        return {
          key: this.cacheKeys.individualKey(record.id),
          value: record,
          path: '$',
        };
      }),
    );
  }
}
