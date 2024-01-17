import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class CacheService implements OnModuleInit {
  private cache: ReturnType<typeof createClient>;

  onModuleInit() {
    this.cache = createClient();
  }

  async get<Model>(key: string): Promise<Model | undefined> {
    const result = this.cache.json.get(key);
    if (!result) return;
    return result as Model;
  }

  public set(key: string, value: Record<any, any>) {
    this.cache.json.set(key, '$', value);
  }
}
