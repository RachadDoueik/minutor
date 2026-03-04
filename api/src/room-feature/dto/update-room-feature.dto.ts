import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomFeatureDto } from './create-room-feature.dto';

export class UpdateRoomFeatureDto extends PartialType(CreateRoomFeatureDto) {}
