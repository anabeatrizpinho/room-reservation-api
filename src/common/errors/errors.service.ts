import {
	BadRequestException,
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { InvalidCredentialsError } from 'src/auth/errors/invalidCredentials.error';
import { InvalidMeetingRoomIdError } from 'src/meeting_rooms/errors/invalidMeetingRoomId.error';
import { MeetingRoomCreationFailed } from 'src/meeting_rooms/errors/meetingRoomCreationFailed.error';
import { MeetingRoomDeleteFailed } from 'src/meeting_rooms/errors/meetingRoomDeleteFailed.error';
import { MeetingRoomNotFoundError } from 'src/meeting_rooms/errors/meetingRoomNotFound.error';
import { MeetingRoomUpdateFailed } from 'src/meeting_rooms/errors/meetingRoomUpdateFailed.error';
import { EndTimeBeforeStartError } from 'src/reservations/errors/endTimeBeforeStart.error';
import { InvalidReservationIdError } from 'src/reservations/errors/invalidReservationId.error';
import { ReservationConflictError } from 'src/reservations/errors/reservationConflict.error';
import { ReservationCreationFailed } from 'src/reservations/errors/reservationCreationFailed.error';
import { ReservationDeleteFailed } from 'src/reservations/errors/reservationDeleteFailed.error';
import { ReservationNotFoundError } from 'src/reservations/errors/reservationNotFound.error';
import { ReservationUpdateFailed } from 'src/reservations/errors/reservationUpdateFailed.error';
import { StartTimePastError } from 'src/reservations/errors/startTimePast.error';
import { EmailFoundError } from 'src/users/errors/emailFound.error';
import { InvalidUserIdError } from 'src/users/errors/invalidUserId.error';
import { UserCreationFailed } from 'src/users/errors/userCreationFailed.error';
import { UserDeleteFailed } from 'src/users/errors/userDeleteFailed.error';
import { UserNotFoundError } from 'src/users/errors/userNotFound.error';
import { UserUpdateFailed } from 'src/users/errors/userUpdateFailed.error';

@Injectable()
export class ErrorHandlerService {
	handleError(e: Error): void {
		if (e instanceof EmailFoundError || e instanceof ReservationConflictError)
			throw new ConflictException(e.message);

		if (
			e instanceof InvalidUserIdError ||
			e instanceof InvalidMeetingRoomIdError ||
			e instanceof InvalidReservationIdError ||
			e instanceof UserCreationFailed ||
			e instanceof UserUpdateFailed ||
			e instanceof UserDeleteFailed ||
			e instanceof MeetingRoomCreationFailed ||
			e instanceof MeetingRoomUpdateFailed ||
			e instanceof MeetingRoomDeleteFailed ||
			e instanceof ReservationCreationFailed ||
			e instanceof ReservationUpdateFailed ||
			e instanceof ReservationDeleteFailed ||
			e instanceof StartTimePastError ||
			e instanceof EndTimeBeforeStartError
		)
			throw new BadRequestException(e.message);

		if (
			e instanceof UserNotFoundError ||
			e instanceof MeetingRoomNotFoundError ||
			e instanceof ReservationNotFoundError
		)
			throw new NotFoundException(e.message);

		if (e instanceof InvalidCredentialsError)
			throw new UnauthorizedException(e.message);

		throw new InternalServerErrorException();
	}
}
