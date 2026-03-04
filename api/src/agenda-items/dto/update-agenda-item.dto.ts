import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaItemDto } from './create-agenda-item.dto';

export class UpdateAgendaItemDto extends PartialType(CreateAgendaItemDto) {}
