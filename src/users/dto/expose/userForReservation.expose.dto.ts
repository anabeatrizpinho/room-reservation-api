import { Expose } from 'class-transformer';

export class UserForReservationDto {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	email: string;
}
