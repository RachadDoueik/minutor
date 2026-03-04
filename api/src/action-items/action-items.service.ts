import { Injectable } from '@nestjs/common';
import { CreateActionItemDto } from './dto/create-action-item.dto';
import { UpdateActionItemDto } from './dto/update-action-item.dto';

@Injectable()
export class ActionItemsService {
  create(createActionItemDto: CreateActionItemDto) {
    return 'This action adds a new actionItem';
  }

  findAll() {
    return `This action returns all actionItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actionItem`;
  }

  update(id: number, updateActionItemDto: UpdateActionItemDto) {
    return `This action updates a #${id} actionItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} actionItem`;
  }
}
