import { Test, TestingModule } from '@nestjs/testing';
import { RoomFeatureService } from './room-feature.service';

describe('RoomFeatureService', () => {
  let service: RoomFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomFeatureService],
    }).compile();

    service = module.get<RoomFeatureService>(RoomFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
