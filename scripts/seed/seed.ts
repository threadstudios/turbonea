import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../../src/modules/drizzle/schema';
import { generateUsers, linkFriends } from './data/users';
import { generatePosts } from './data/posts';
import { sql } from 'drizzle-orm';
import { generateComments } from './data/comments';

const queryClient = postgres(
  'postgres://turbonea:example@0.0.0.0:15433/turbonea',
);

const db = drizzle(queryClient, {
  schema,
});

async function seed() {
  await db.execute(sql`
    TRUNCATE ${schema.comments} RESTART IDENTITY CASCADE;
    TRUNCATE ${schema.posts} RESTART IDENTITY CASCADE;
    TRUNCATE ${schema.users} RESTART IDENTITY CASCADE;
  `);

  const users = generateUsers(100);
  await db.insert(schema.users).values(users);
  console.log('Seeded Users');
  const friends = linkFriends(users);
  const friendsMapped = Array.from(friends).map((record) => {
    const [fromId, toId] = record.split(':');
    return { fromId, toId };
  });
  await db.insert(schema.usersToUsers).values(friendsMapped);
  console.log('Seeded Friends');
  const posts = generatePosts(users);
  await db.insert(schema.posts).values(posts);
  console.log('Seeded Posts');
  const comments = generateComments(posts, friendsMapped);
  await db.insert(schema.comments).values(comments);
  console.log('Seeded Comments');
  //const interactions = generateInteractions(posts, friendsMapped);
  process.exit();
}

seed();
