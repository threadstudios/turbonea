import { Global, Module } from '@nestjs/common';
import { CacheService } from './service/cache.service';

@Global()
@Module({
  providers: [CacheService],
})
export class CacheModule {}
