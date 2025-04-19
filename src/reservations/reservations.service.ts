import { Injectable } from '@nestjs/common';
import { Prisma, Reservation } from '@prisma/client';
import { InvalidMeetingRoomIdError } from 'src/meeting_rooms/errors/invalidMeetingRoomId.error';
import { MeetingRoomNotFoundError } from 'src/meeting_rooms/errors/meetingRoomNotFound.error';
import { MeetingRoomsRepository } from 'src/meeting_rooms/meeting_rooms.repository';
import { PrismaService } from 'src/prisma.service';
import { InvalidUserIdError } from 'src/users/errors/invalidUserId.error';
import { UserNotFoundError } from 'src/users/errors/userNotFound.error';
import { UsersRepository } from 'src/users/users.repository';
import { EndTimeBeforeStartError } from './errors/endTimeBeforeStart.error';
import { InvalidReservationIdError } from './errors/invalidReservationId.error';
import { ReservationConflictError } from './errors/reservationConflict.error';
import { ReservationCreationFailed } from './errors/reservationCreationFailed.error';
import { ReservationDeleteFailed } from './errors/reservationDeleteFailed.error';
import { ReservationNotFoundError } from './errors/reservationNotFound.error';
import { ReservationUpdateFailed } from './errors/reservationUpdateFailed.error';
import { StartTimePastError } from './errors/startTimePast.error';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService implements ReservationsRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly usersRepo: UsersRepository,
		private readonly meetingRoomsRepo: MeetingRoomsRepository,
	) {}

	async create(
		data: Prisma.ReservationUncheckedCreateInput,
	): Promise<Reservation> {
		try {
			const { startTime, endTime, roomId, userId } = data;

			const newStart = new Date(startTime);
			const newEnd = new Date(endTime);

			this.validateReservationTimes(newStart, newEnd);

			await Promise.all([
				this.usersRepo.findOne({ id: userId }),
				this.meetingRoomsRepo.findOne({ id: roomId }),
			]);

			await this.verifyReservationConflicts(newStart, newEnd, roomId);

			return await this.prisma.reservation.create({
				data,
				include: {
					user: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
					room: {
						select: {
							id: true,
							name: true,
							capacity: true,
						},
					},
				},
			});
		} catch (e: any) {
			if (
				e instanceof StartTimePastError ||
				e instanceof EndTimeBeforeStartError ||
				e instanceof EndTimeBeforeStartError ||
				e instanceof ReservationConflictError ||
				e instanceof InvalidUserIdError ||
				e instanceof UserNotFoundError ||
				e instanceof InvalidMeetingRoomIdError ||
				e instanceof MeetingRoomNotFoundError
			)
				throw e;
			throw new ReservationCreationFailed();
		}
	}

	async findAll(): Promise<Reservation[]> {
		return await this.prisma.reservation.findMany({
			where: { deletedAt: null },
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				room: {
					select: {
						id: true,
						name: true,
						capacity: true,
					},
				},
			},
		});
	}

	async findOne(
		data: Prisma.ReservationWhereUniqueInput,
	): Promise<Reservation> {
		const { id } = data;
		if (!id || id <= 0) throw new InvalidReservationIdError();

		const reservation = await this.prisma.reservation.findUnique({
			where: { id, deletedAt: null },
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				room: {
					select: {
						id: true,
						name: true,
						capacity: true,
					},
				},
			},
		});

		if (!reservation) throw new ReservationNotFoundError();

		return reservation;
	}

	async update(
		id: number,
		data: Prisma.ReservationUncheckedUpdateInput,
	): Promise<Reservation> {
		try {
			const { startTime, endTime, roomId } = data;

			const existingReservation = await this.findOne({ id });

			const newStart =
				startTime != null
					? new Date(startTime as string)
					: new Date(existingReservation.startTime);

			const newEnd =
				endTime != null
					? new Date(endTime as string)
					: new Date(existingReservation.endTime);

			const newRoomId = roomId ?? existingReservation.roomId;

			this.validateReservationTimes(newStart, newEnd);

			if (newRoomId !== undefined) {
				await this.meetingRoomsRepo.findOne({ id: newRoomId as number });
			}

			await this.verifyReservationConflicts(
				newStart,
				newEnd,
				newRoomId as number,
				id,
			);

			return await this.prisma.reservation.update({
				where: { id },
				data: {
					...data,
					updatedAt: new Date(),
				},
				include: {
					user: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
					room: {
						select: {
							id: true,
							name: true,
							capacity: true,
						},
					},
				},
			});
		} catch (e: any) {
			if (
				e instanceof InvalidReservationIdError ||
				e instanceof ReservationNotFoundError ||
				e instanceof StartTimePastError ||
				e instanceof EndTimeBeforeStartError ||
				e instanceof ReservationConflictError ||
				e instanceof InvalidUserIdError ||
				e instanceof UserNotFoundError ||
				e instanceof InvalidMeetingRoomIdError ||
				e instanceof MeetingRoomNotFoundError
			) {
				throw e;
			}

			throw new ReservationUpdateFailed();
		}
	}

	async remove(data: Prisma.ReservationWhereUniqueInput): Promise<Reservation> {
		const { id } = data;

		try {
			await this.findOne({ id });
			return await this.prisma.reservation.update({
				where: { id },
				data: {
					deletedAt: new Date(),
				},
				include: {
					user: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
					room: {
						select: {
							id: true,
							name: true,
							capacity: true,
						},
					},
				},
			});
		} catch (e: any) {
			if (
				e instanceof InvalidReservationIdError ||
				e instanceof ReservationNotFoundError
			)
				throw e;
			throw new ReservationDeleteFailed();
		}
	}

	private validateReservationTimes(start: Date, end: Date): void {
		const now = new Date();

		if (start <= now) {
			throw new StartTimePastError();
		}

		if (end <= start) {
			throw new EndTimeBeforeStartError();
		}
	}

	private async verifyReservationConflicts(
		startTime: Date,
		endTime: Date,
		roomId: number,
		excludeReservationId?: number,
	): Promise<void> {
		const existingReservations = await this.prisma.reservation.findMany({
			where: {
				roomId,
				deletedAt: null,
				...(excludeReservationId && {
					NOT: { id: excludeReservationId },
				}),
			},
		});

		for (const reservation of existingReservations) {
			const existingStart = new Date(reservation.startTime);
			const existingEnd = new Date(reservation.endTime);

			const startsDuring =
				startTime >= existingStart && startTime < existingEnd;
			const endsDuring = endTime > existingStart && endTime <= existingEnd;
			const wrapsAround = startTime <= existingStart && endTime >= existingEnd;

			if (startsDuring || endsDuring || wrapsAround) {
				throw new ReservationConflictError();
			}
		}
	}
}
