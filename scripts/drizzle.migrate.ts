import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const sql = postgres('postgres://turbonea:example@0.0.0.0:15433/turbonea', {
  max: 1,
});
const db = drizzle(sql);

async function doMigrate() {
  await migrate(db, { migrationsFolder: 'generated/drizzle' });
  await sql.end();
}

doMigrate();
