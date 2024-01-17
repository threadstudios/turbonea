import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/service/drizzle.service';
import { interactions } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class InteractionService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getInteractionsByEntityId(entityId: string) {
    return this.drizzleService.db
      .select()
      .from(interactions)
      .where(eq(interactions.entityId, entityId));
  }
}
