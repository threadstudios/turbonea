import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/modules/drizzle/schema.ts',
  out: './generated/drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
