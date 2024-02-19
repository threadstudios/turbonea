import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import * as schema from '../schema';

@Injectable()
export class DrizzleService implements OnModuleInit {
  public db: PostgresJsDatabase<typeof schema>;
  private readonly logger = new Logger(DrizzleService.name);

  constructor() {}

  onModuleInit() {
    const queryClient = postgres(process.env.DATABASE_URL);
    this.db = drizzle(queryClient, {
      schema,
      logger: {
        logQuery: (query, opts) => {
          this.logger.log('Executed DB Query');
        },
      },
    });
  }
}
