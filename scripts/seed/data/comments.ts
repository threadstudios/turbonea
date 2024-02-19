import { DbNewComment, DbNewPost, DbNewUser } from 'src/modules/drizzle/schema';
import { randomInt } from '../util';
import { faker } from '@faker-js/faker';

export function generateComments(
  posts: DbNewPost[],
  friendRows: { fromId: string; toId: string }[],
): DbNewPost[] {
  const commentMap: DbNewComment[] = [];
  const friendMap = new Map<string, string[]>();
  friendRows.forEach((friendRow) => {
    if (!friendMap.has(friendRow.fromId)) {
      friendMap.set(friendRow.fromId, [friendRow.toId]);
      return;
    }
    friendMap.set(friendRow.fromId, [
      ...friendMap.get(friendRow.fromId),
      friendRow.toId,
    ]);
  });
  for (const post of posts) {
    const associatedFriends = friendMap.get(post.authorId);
    associatedFriends.forEach((friend) => {
      if (randomInt(3) <= 1) {
        commentMap.push({
          authorId: friend,
          content: faker.lorem.sentences({ min: 2, max: 4 }),
          postId: post.id,
        });
      }
    });
  }
  return commentMap;
}
