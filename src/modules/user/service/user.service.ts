import { eq } from 'drizzle-orm';
import { DbNewUser, DbUser, users, usersToUsers } from '../../drizzle/schema';
import { DrizzleService } from './../../drizzle/service/drizzle.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
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

  async getUsers(): Promise<DbUser[]> {
    const result = await this.drizzle.db.select().from(users);
    return result;
  }

  async getFriends(id: string): Promise<any[]> {
    const result = await this.drizzle.db
      .select()
      .from(users)
      .leftJoin(usersToUsers, eq(users.id, usersToUsers.toId))
      .where(eq(usersToUsers.fromId, id));
    return result.map((row) => row.user);
  }
}
