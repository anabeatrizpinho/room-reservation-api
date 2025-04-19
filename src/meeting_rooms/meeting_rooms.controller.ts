import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { MeetingRoom } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ErrorHandlerService } from 'src/common/errors/errors.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateMeetingRoomDto } from './dto/body/create-meeting_room.body.dto';
import { UpdateMeetingRoomDto } from './dto/body/update-meeting_room.body.dto';
import { MeetingRoomDto } from './dto/expose/meeting_room.expose.dto';
import { MeetingRoomsRepository } from './meeting_rooms.repository';

@UseGuards(JwtAuthGuard)
@Serialize(MeetingRoomDto)
@Controller('meeting-rooms')
export class MeetingRoomsController {
	constructor(
		private readonly meetingRoomsRepo: MeetingRoomsRepository,
		private readonly errorHandlerService: ErrorHandlerService,
	) {}

	@Post()
	async create(@Body() body: CreateMeetingRoomDto): Promise<MeetingRoom> {
		try {
			return await this.meetingRoomsRepo.create(body);
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}

	@Get()
	async findAll(): Promise<MeetingRoom[]> {
		try {
			return await this.meetingRoomsRepo.findAll();
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<MeetingRoom> {
		try {
			return await this.meetingRoomsRepo.findOne({ id });
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}

	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: UpdateMeetingRoomDto,
	): Promise<MeetingRoom> {
		try {
			return await this.meetingRoomsRepo.update(id, body);
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<MeetingRoom> {
		try {
			return await this.meetingRoomsRepo.remove({ id });
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}
}
