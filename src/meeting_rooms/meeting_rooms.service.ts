import { Injectable } from '@nestjs/common';

import { MeetingRoom, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { InvalidMeetingRoomIdError } from './errors/invalidMeetingRoomId.error';
import { MeetingRoomCreationFailed } from './errors/meetingRoomCreationFailed.error';
import { MeetingRoomDeleteFailed } from './errors/meetingRoomDeleteFailed.error';
import { MeetingRoomNotFoundError } from './errors/meetingRoomNotFound.error';
import { MeetingRoomUpdateFailed } from './errors/meetingRoomUpdateFailed.error';
import { MeetingRoomsRepository } from './meeting_rooms.repository';

@Injectable()
export class MeetingRoomsService implements MeetingRoomsRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(
		data: Prisma.MeetingRoomUncheckedCreateInput,
	): Promise<MeetingRoom> {
		try {
			return await this.prisma.meetingRoom.create({ data });
		} catch (_e: any) {
			throw new MeetingRoomCreationFailed();
		}
	}

	async findAll(): Promise<MeetingRoom[]> {
		return await this.prisma.meetingRoom.findMany({
			where: { deletedAt: null },
		});
	}

	async findOne(
		data: Prisma.MeetingRoomWhereUniqueInput,
	): Promise<MeetingRoom> {
		const { id } = data;
		if (!id || id <= 0) throw new InvalidMeetingRoomIdError();

		const meetingRoom = await this.prisma.meetingRoom.findUnique({
			where: { id, deletedAt: null },
		});

		if (!meetingRoom) throw new MeetingRoomNotFoundError();
		return meetingRoom;
	}

	async update(
		id: number,
		data: Prisma.MeetingRoomUpdateInput,
	): Promise<MeetingRoom> {
		try {
			await this.findOne({ id });
			return await this.prisma.meetingRoom.update({
				where: { id },
				data: {
					...data,
					updatedAt: new Date(),
				},
			});
		} catch (e: any) {
			if (
				e instanceof InvalidMeetingRoomIdError ||
				e instanceof MeetingRoomNotFoundError
			)
				throw e;
			throw new MeetingRoomUpdateFailed();
		}
	}

	async remove(data: Prisma.MeetingRoomWhereUniqueInput): Promise<MeetingRoom> {
		const { id } = data;

		try {
			await this.findOne({ id });
			return await this.prisma.meetingRoom.update({
				where: { id },
				data: {
					deletedAt: new Date(),
				},
			});
		} catch (e: any) {
			if (
				e instanceof InvalidMeetingRoomIdError ||
				e instanceof MeetingRoomNotFoundError
			)
				throw e;
			throw new MeetingRoomDeleteFailed();
		}
	}
}
