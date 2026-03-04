import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgendaItemsService } from './agenda-items.service';
import { CreateAgendaItemDto } from './dto/create-agenda-item.dto';
import { UpdateAgendaItemDto } from './dto/update-agenda-item.dto';

@Controller('agenda-items')
export class AgendaItemsController {
  constructor(private readonly agendaItemsService: AgendaItemsService) {}

  @Post()
  create(@Body() createAgendaItemDto: CreateAgendaItemDto) {
    return this.agendaItemsService.create(createAgendaItemDto);
  }

  @Get()
  findAll() {
    return this.agendaItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendaItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgendaItemDto: UpdateAgendaItemDto) {
    return this.agendaItemsService.update(+id, updateAgendaItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendaItemsService.remove(+id);
  }
}
