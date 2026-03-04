import { Injectable } from '@nestjs/common';
import { CreateAgendaItemDto } from './dto/create-agenda-item.dto';
import { UpdateAgendaItemDto } from './dto/update-agenda-item.dto';

@Injectable()
export class AgendaItemsService {
  create(createAgendaItemDto: CreateAgendaItemDto) {
    return 'This action adds a new agendaItem';
  }

  findAll() {
    return `This action returns all agendaItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agendaItem`;
  }

  update(id: number, updateAgendaItemDto: UpdateAgendaItemDto) {
    return `This action updates a #${id} agendaItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} agendaItem`;
  }
}
