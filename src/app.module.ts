import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MeetingRoomsModule } from './meeting_rooms/meeting_rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [UsersModule, ReservationsModule, AuthModule, MeetingRoomsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
