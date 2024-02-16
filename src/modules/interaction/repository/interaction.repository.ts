import { Injectable } from '@nestjs/common';
import {
  DbInteraction,
  DbNewInteraction,
  interactions,
} from '../../drizzle/schema';
import { eq, inArray } from 'drizzle-orm';
import { PostgresRepository } from 'src/modules/common/repository/postgres.repository';

@Injectable()
export class InteractionRepository extends PostgresRepository<
  typeof interactions,
  DbNewInteraction,
  DbInteraction
> {
  public table = interactions;

  async getByEntityId(entityId: string) {
    return this.drizzle.db
      .select()
      .from(interactions)
      .where(eq(interactions.entityId, entityId));
  }

  async getByEntityIds(entityIds: string[]) {
    return this.drizzle.db
      .select()
      .from(interactions)
      .where(inArray(interactions.entityId, entityIds));
  }
}
