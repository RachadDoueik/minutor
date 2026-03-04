import { Module } from '@nestjs/common';
import { RoomFeatureService } from './room-feature.service';
import { RoomFeatureController } from './room-feature.controller';

@Module({
  controllers: [RoomFeatureController],
  providers: [RoomFeatureService],
})
export class RoomFeatureModule {}
