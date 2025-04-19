import { Expose, Type } from 'class-transformer';
import { MeetingRoomDto } from 'src/meeting_rooms/dto/expose/meeting_room.expose.dto';
import { UserForReservationDto } from 'src/users/dto/expose/userForReservation.expose.dto';

export class ReservationDto {
	@Expose()
	id: number;

	@Expose()
	startTime: Date;

	@Expose()
	endTime: Date;

	@Expose()
	@Type(() => UserForReservationDto)
	user: UserForReservationDto;

	@Expose()
	@Type(() => MeetingRoomDto)
	room: MeetingRoomDto;
}
