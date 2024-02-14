import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/service/drizzle.service';
import { DbNewUser, DbUser, users, usersToUsers } from '../../drizzle/schema';
import { eq, inArray } from 'drizzle-orm';

@Injectable()
export class UserRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async createUser(newUser: DbNewUser): Promise<DbUser> {
    const result = await this.drizzle.db
      .insert(users)
      .values(newUser)
      .returning();
    return result[0];
  }

  async getUserById(id: string): Promise<DbUser> {
    const result = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0];
  }

  async getUsersById(ids: string[]): Promise<DbUser[]> {
    const results = await this.drizzle.db
      .select()
      .from(users)
      .where(inArray(users.id, ids));
    return results;
  }

  async getFriendsForIds(ids: string[]): Promise<DbUser[][]> {
    const results = await this.drizzle.db
      .select()
      .from(users)
      .leftJoin(usersToUsers, eq(users.id, usersToUsers.toId))
      .where(inArray(usersToUsers.fromId, ids));

    const reduced = results.reduce((acc: Record<string, DbUser[]>, row) => {
      if (!acc[row.users_to_users.fromId]) acc[row.users_to_users.fromId] = [];
      acc[row.users_to_users.fromId].push(row.user);
      return acc;
    }, {});

    return ids.map((id) => reduced[id] || []);
  }

  async getFriends(id: string): Promise<DbUser[]> {
    const result = await this.drizzle.db
      .select()
      .from(users)
      .leftJoin(usersToUsers, eq(users.id, usersToUsers.toId))
      .where(eq(usersToUsers.fromId, id));
    return result.map((row) => row.user);
  }
}
