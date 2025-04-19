import { MeetingRoom, Prisma } from '@prisma/client';

export abstract class MeetingRoomsRepository {
	abstract create(
		data: Prisma.MeetingRoomUncheckedCreateInput,
	): Promise<MeetingRoom>;
	abstract findAll(): Promise<MeetingRoom[]>;
	abstract findOne(
		data: Prisma.MeetingRoomWhereUniqueInput,
	): Promise<MeetingRoom>;
	abstract update(
		id: number,
		data: Prisma.MeetingRoomUpdateInput,
	): Promise<MeetingRoom>;
	abstract remove(
		data: Prisma.MeetingRoomWhereUniqueInput,
	): Promise<MeetingRoom>;
}
