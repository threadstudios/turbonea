import { Injectable, Logger } from '@nestjs/common';
import { UserCacheService } from '../cache/user.cache';
import { OnTurboEvent } from 'src/modules/common/decorator/onTurboEvent.decorator';
import { UserCreatedEvent, UserEvents } from '../user.events';
import { UserService } from '../service/user.service';

@Injectable()
export class UserListener {
  private readonly logger = new Logger(UserListener.name);

  constructor(
    private readonly userCacheService: UserCacheService,
    private readonly userService: UserService,
  ) {}

  @OnTurboEvent(UserEvents.UserCreated)
  async handleUserCreatedEvent(payload: UserCreatedEvent): Promise<void> {
    const user = await this.userService.getUserById(payload.id);
    await this.userCacheService.set(payload.id, user);
    this.logger.log('Completed User Created Event');
  }
}
