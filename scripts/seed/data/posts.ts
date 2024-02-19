import { DbNewPost, DbNewUser } from 'src/modules/drizzle/schema';
import { randomInt } from '../util';
import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';

export function generatePosts(users: DbNewUser[]): DbNewPost[] {
  const postMap: DbNewPost[] = [];
  for (const user of users) {
    for (let i = 0; i <= randomInt(10); i++) {
      postMap.push({
        id: v4(),
        authorId: user.id,
        content: faker.lorem.sentences({ min: 2, max: 4 }),
      });
    }
  }
  return postMap;
}
