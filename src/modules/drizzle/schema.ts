import { varchar, text, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const users = pgTable('user', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: text('name').notNull(),
});

export const posts = pgTable('post', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  content: text('content').notNull(),
  authorId: varchar('author_id').notNull(),
});

export const comments = pgTable('comment', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  content: text('content').notNull(),
  authorId: varchar('author_id').notNull(),
  postId: varchar('post_id'),
});

export const interactions = pgTable('interaction', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  type: varchar('type').notNull(),
  authorId: varchar('author_id').notNull(),
  entityId: varchar('entity_id').notNull(),
});

export const usersToUsers = pgTable(
  'users_to_users',
  {
    fromId: varchar('from_id')
      .notNull()
      .references(() => users.id),
    toId: varchar('to_id')
      .notNull()
      .references(() => users.id),
  },
  (t) => ({
    pk: primaryKey(t.fromId, t.toId),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  friends: many(usersToUsers),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
  interactions: many(interactions),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  author: one(users, { fields: [comments.authorId], references: [users.id] }),
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
}));

export const interactionsRelations = relations(interactions, ({ one }) => ({
  post: one(posts, { fields: [interactions.entityId], references: [posts.id] }),
  comment: one(comments, {
    fields: [interactions.entityId],
    references: [comments.id],
  }),
}));

export const usersToUsersRelations = relations(usersToUsers, ({ one }) => ({
  from: one(users, {
    fields: [usersToUsers.fromId],
    references: [users.id],
  }),
  to: one(users, {
    fields: [usersToUsers.toId],
    references: [users.id],
  }),
}));

export type DbNewUser = typeof users.$inferInsert;
export type DbUser = typeof users.$inferSelect;
export type DbNewPost = typeof posts.$inferInsert;
export type DbPost = typeof posts.$inferSelect;
export type DbNewComment = typeof comments.$inferInsert;
export type DbComment = typeof comments.$inferSelect;
export type DbNewInteraction = typeof interactions.$inferInsert;
export type DbInteraction = typeof interactions.$inferSelect;
