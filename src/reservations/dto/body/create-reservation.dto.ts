import { IsDateString, IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ValidationMessage } from 'src/common/enums/validatorValue.enum';

export class CreateReservationDto {
	@IsNotEmpty({ message: `User id ${ValidationMessage.NOT_EMPTY}` })
	@IsInt({ message: `User id ${ValidationMessage.BE_INTEGER}` })
	@IsPositive({ message: `User id ${ValidationMessage.BE_POSITIVE}` })
	userId: number;

	@IsNotEmpty({ message: `Room id ${ValidationMessage.NOT_EMPTY}` })
	@IsInt({ message: `Room id ${ValidationMessage.BE_INTEGER}` })
	@IsPositive({ message: `Room id ${ValidationMessage.BE_POSITIVE}` })
	roomId: number;

	@IsNotEmpty({ message: `Start Time ${ValidationMessage.NOT_EMPTY}` })
	@IsDateString()
	startTime: Date;

	@IsNotEmpty({ message: `End Time ${ValidationMessage.NOT_EMPTY}` })
	@IsDateString()
	endTime: Date;
}
