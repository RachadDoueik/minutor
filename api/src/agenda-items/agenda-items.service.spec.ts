import { Test, TestingModule } from '@nestjs/testing';
import { AgendaItemsService } from './agenda-items.service';

describe('AgendaItemsService', () => {
  let service: AgendaItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgendaItemsService],
    }).compile();

    service = module.get<AgendaItemsService>(AgendaItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
