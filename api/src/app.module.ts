import { Module , NestModule , MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
import { MeetingsModule } from './meetings/meetings.module';
import { AgendasModule } from './agendas/agendas.module';
import { AgendaItemsModule } from './agenda-items/agenda-items.module';
import { ActionItemsModule } from './action-items/action-items.module';
import { RoomFeatureModule } from './room-feature/room-feature.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(
     { envFilePath: '.env' }
  ), UsersModule,
     RoomsModule,
     RoomFeatureModule,
     MeetingsModule, 
     AgendasModule, 
     AgendaItemsModule, 
     ActionItemsModule, 
     AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}

