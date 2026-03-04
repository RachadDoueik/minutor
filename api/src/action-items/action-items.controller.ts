import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActionItemsService } from './action-items.service';
import { CreateActionItemDto } from './dto/create-action-item.dto';
import { UpdateActionItemDto } from './dto/update-action-item.dto';

@Controller('action-items')
export class ActionItemsController {
  constructor(private readonly actionItemsService: ActionItemsService) {}

  @Post()
  create(@Body() createActionItemDto: CreateActionItemDto) {
    return this.actionItemsService.create(createActionItemDto);
  }

  @Get()
  findAll() {
    return this.actionItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActionItemDto: UpdateActionItemDto) {
    return this.actionItemsService.update(+id, updateActionItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionItemsService.remove(+id);
  }
}
