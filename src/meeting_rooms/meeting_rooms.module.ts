import { Module } from '@nestjs/common';
import { ErrorHandlerService } from 'src/common/errors/errors.service';
import { PrismaService } from 'src/prisma.service';
import { MeetingRoomsController } from './meeting_rooms.controller';
import { MeetingRoomsRepository } from './meeting_rooms.repository';
import { MeetingRoomsService } from './meeting_rooms.service';

@Module({
	controllers: [MeetingRoomsController],
	providers: [
		PrismaService,
		ErrorHandlerService,
		MeetingRoomsService,
		{
			provide: MeetingRoomsRepository,
			useExisting: MeetingRoomsService,
		},
	],
	exports: [MeetingRoomsRepository],
})
export class MeetingRoomsModule {}
