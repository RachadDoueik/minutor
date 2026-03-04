import { Test, TestingModule } from '@nestjs/testing';
import { AgendaItemsController } from './agenda-items.controller';
import { AgendaItemsService } from './agenda-items.service';

describe('AgendaItemsController', () => {
  let controller: AgendaItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendaItemsController],
      providers: [AgendaItemsService],
    }).compile();

    controller = module.get<AgendaItemsController>(AgendaItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
