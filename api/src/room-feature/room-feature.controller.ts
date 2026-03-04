import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomFeatureService } from './room-feature.service';
import { CreateRoomFeatureDto } from './dto/create-room-feature.dto';
import { UpdateRoomFeatureDto } from './dto/update-room-feature.dto';

@Controller('room-feature')
export class RoomFeatureController {
  constructor(private readonly roomFeatureService: RoomFeatureService) {}

  @Post()
  create(@Body() createRoomFeatureDto: CreateRoomFeatureDto) {
    return this.roomFeatureService.create(createRoomFeatureDto);
  }

  @Get()
  findAll() {
    return this.roomFeatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomFeatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomFeatureDto: UpdateRoomFeatureDto) {
    return this.roomFeatureService.update(+id, updateRoomFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomFeatureService.remove(+id);
  }
}
