import { Module } from '@nestjs/common';
import { ErrorHandlerService } from 'src/common/errors/errors.service';
import { MeetingRoomsModule } from 'src/meeting_rooms/meeting_rooms.module';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { ReservationsService } from './reservations.service';

@Module({
	controllers: [ReservationsController],
	providers: [
		PrismaService,
		ErrorHandlerService,
		ReservationsService,
		{
			provide: ReservationsRepository,
			useExisting: ReservationsService,
		},
	],
	imports: [UsersModule, MeetingRoomsModule],
})
export class ReservationsModule {}
