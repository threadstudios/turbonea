import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { InteractionService } from './service/interaction.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [InteractionService],
  exports: [InteractionService],
})
export class InteractionModule {}
