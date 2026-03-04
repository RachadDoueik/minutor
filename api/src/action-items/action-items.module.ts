import { Module } from '@nestjs/common';
import { ActionItemsService } from './action-items.service';
import { ActionItemsController } from './action-items.controller';

@Module({
  controllers: [ActionItemsController],
  providers: [ActionItemsService],
})
export class ActionItemsModule {}
