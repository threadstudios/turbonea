import { DbNewUser } from 'src/modules/drizzle/schema';
import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { getRandomFromArray, randomInt } from '../util';

export function generateUsers(count: number): DbNewUser[] {
  const users: DbNewUser[] = [];
  for (let i = 0; i <= count; i++) {
    users.push({
      id: v4(),
      name: faker.person.fullName(),
      email: faker.internet.exampleEmail(),
    });
  }
  return users;
}

export function linkFriends(users: DbNewUser[]): Set<string> {
  const friendshipMap = new Set<string>();
  for (const user of users) {
    const friends = getRandomFromArray(users, randomInt(12));
    friends.forEach((friend) => {
      if (
        !friendshipMap.has(`${user.id}:${friend.id}`) ||
        !friendshipMap.has(`${friend.id}:${user.id}`) ||
        friend.id !== user.id
      ) {
        friendshipMap.add(`${user.id}:${friend.id}`);
        friendshipMap.add(`${friend.id}:${user.id}`);
      }
    });
  }
  return friendshipMap;
}
