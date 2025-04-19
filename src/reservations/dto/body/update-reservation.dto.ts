import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';
import { ValidationMessage } from 'src/common/enums/validatorValue.enum';

export class UpdateReservationDto {
	@IsOptional()
	@IsInt({ message: `Room id ${ValidationMessage.BE_INTEGER}` })
	@IsPositive({ message: `Room id ${ValidationMessage.BE_POSITIVE}` })
	roomId: number;

	@IsOptional()
	@IsDateString()
	startTime: Date;

	@IsOptional()
	@IsDateString()
	endTime: Date;
}
