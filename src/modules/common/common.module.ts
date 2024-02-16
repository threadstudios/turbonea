import { Global, Module } from '@nestjs/common';
import { PostgresRepository } from './repository/postgres.repository';

@Global()
@Module({
  providers: [],
  exports: [],
})
export class CommonModule {}
