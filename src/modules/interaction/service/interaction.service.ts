import { Injectable, Logger } from '@nestjs/common';
import { DbInteraction } from '../../drizzle/schema';
import { InteractionRepository } from '../repository/interaction.repository';
import { mapResponseToIds } from 'src/modules/common/mapper/mapResponseToIds';

@Injectable()
export class InteractionService {
  private readonly logger = new Logger(InteractionService.name);
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async getInteractionsByEntityId(entityId: string) {
    return this.interactionRepository.getByEntityId(entityId);
  }

  async getInteractionsByEntityIds(entityIds: string[]) {
    const interactionResult =
      await this.interactionRepository.getByEntityIds(entityIds);
    return mapResponseToIds<DbInteraction>({
      result: interactionResult,
      byKey: 'entityId',
      ids: entityIds,
    });
  }
}
