import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { InteractionService } from './service/interaction.service';
import { InteractionResolver } from './resolver/interaction.resolver';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [InteractionService, InteractionResolver],
  exports: [InteractionService],
})
export class InteractionModule {}
