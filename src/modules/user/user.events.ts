export enum UserEvents {
  UserCreated = 'user.created',
  UserUpdated = 'user.updated',
  UserAddedFriend = 'user.friend.added',
  UserRemovedFriend = 'user.friend.removed',
}

export interface UserCreatedEvent {
  id: string;
}
