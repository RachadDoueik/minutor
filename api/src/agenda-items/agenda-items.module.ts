import { Module } from '@nestjs/common';
import { AgendaItemsService } from './agenda-items.service';
import { AgendaItemsController } from './agenda-items.controller';

@Module({
  controllers: [AgendaItemsController],
  providers: [AgendaItemsService],
})
export class AgendaItemsModule {}
