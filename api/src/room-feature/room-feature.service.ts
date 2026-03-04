import { Injectable } from '@nestjs/common';
import { CreateRoomFeatureDto } from './dto/create-room-feature.dto';
import { UpdateRoomFeatureDto } from './dto/update-room-feature.dto';

@Injectable()
export class RoomFeatureService {
  create(createRoomFeatureDto: CreateRoomFeatureDto) {
    return 'This action adds a new roomFeature';
  }

  findAll() {
    return `This action returns all roomFeature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomFeature`;
  }

  update(id: number, updateRoomFeatureDto: UpdateRoomFeatureDto) {
    return `This action updates a #${id} roomFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomFeature`;
  }
}
