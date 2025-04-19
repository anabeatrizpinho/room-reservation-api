import { Expose } from 'class-transformer';

export class MeetingRoomDto {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	capacity: number;
}
