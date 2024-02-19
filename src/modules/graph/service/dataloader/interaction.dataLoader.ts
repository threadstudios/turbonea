import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { InteractionService } from 'src/modules/interaction/service/interaction.service';
import { DbInteraction } from 'src/modules/drizzle/schema';

@Injectable()
export class InteractionDataLoader {
  constructor(private readonly interactionService: InteractionService) {}

  private createEntitiesInteractionsLoader() {
    return new DataLoader<string, DbInteraction[]>(
      async (entityIds: string[]) =>
        await this.interactionService.getInteractionsByEntityIds(entityIds),
    );
  }

  getLoaders() {
    return {
      entitiesInteractionsLoader: this.createEntitiesInteractionsLoader(),
    };
  }
}
