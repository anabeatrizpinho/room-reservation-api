import { Prisma, Reservation } from '@prisma/client';

export abstract class ReservationsRepository {
	abstract create(
		data: Prisma.ReservationUncheckedCreateInput,
	): Promise<Reservation>;

	abstract findAll(): Promise<Reservation[]>;

	abstract findOne(
		data: Prisma.ReservationWhereUniqueInput,
	): Promise<Reservation>;

	abstract update(
		id: number,
		data: Prisma.ReservationUncheckedUpdateInput,
	): Promise<Reservation>;

	abstract remove(
		data: Prisma.ReservationWhereUniqueInput,
	): Promise<Reservation>;
}
