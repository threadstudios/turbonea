import { Injectable } from '@nestjs/common';
import { DbNewUser, DbUser, users, usersToUsers } from '../../drizzle/schema';
import { eq, inArray } from 'drizzle-orm';
import { PostgresRepository } from 'src/modules/common/repository/postgres.repository';

@Injectable()
export class UserRepository extends PostgresRepository<
  typeof users,
  DbNewUser,
  DbUser
> {
  public table = users;

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
}
