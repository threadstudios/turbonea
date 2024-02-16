import { Module } from '@nestjs/common';
import { InteractionService } from './service/interaction.service';
import { InteractionRepository } from './repository/interaction.repository';
import { InteractionCacheService } from './cache/interaction.cache';

@Module({
  imports: [],
  providers: [
    InteractionService,
    InteractionRepository,
    InteractionCacheService,
  ],
  exports: [InteractionService],
})
export class InteractionModule {}
