import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/modules/drizzle/schema.ts',
  out: './generated/drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: 'postgres://turbonea:example@0.0.0.0:15433/turbonea',
  },
} satisfies Config;
