import { Injectable, Logger } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/service/drizzle.service';
import { DbInteraction, interactions } from '../../drizzle/schema';
import { eq, inArray } from 'drizzle-orm';

@Injectable()
export class InteractionService {
  private readonly logger = new Logger(InteractionService.name);
  constructor(private readonly drizzle: DrizzleService) {}

  async getInteractionsByEntityId(entityId: string) {
    return this.drizzle.db
      .select()
      .from(interactions)
      .where(eq(interactions.entityId, entityId));
  }

  async getInteractionsByEntityIds(entityIds: string[]) {
    this.logger.log('Batch fetching Interactions');
    const interactionResult = await this.drizzle.db
      .select()
      .from(interactions)
      .where(inArray(interactions.entityId, entityIds));
    const reduced = interactionResult.reduce(
      (acc: Record<string, DbInteraction[]>, row) => {
        if (!acc[row.entityId]) acc[row.entityId] = [];
        acc[row.entityId].push(row);
        return acc;
      },
      {},
    );
    return entityIds.map((id) => reduced[id] || []);
  }
}
