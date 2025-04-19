import {
	IsInt,
	IsNotEmpty,
	IsPositive,
	IsString,
	MaxLength,
} from 'class-validator';
import {
	ValidationMessage,
	ValidatorValue,
} from 'src/common/enums/validatorValue.enum';

export class CreateMeetingRoomDto {
	@IsNotEmpty({ message: `Name ${ValidationMessage.NOT_EMPTY}` })
	@IsString({ message: `Name ${ValidationMessage.INVALID_TYPE}` })
	@MaxLength(ValidatorValue.NAME_MAX_LENGTH, {
		message: `Name should be ${ValidatorValue.NAME_MAX_LENGTH} ${ValidationMessage.MAX_LENGTH}`,
	})
	name: string;

	@IsNotEmpty({ message: `Capacity ${ValidationMessage.NOT_EMPTY}` })
	@IsInt({ message: `Capacity id ${ValidationMessage.BE_INTEGER}` })
	@IsPositive({ message: `Capacity id ${ValidationMessage.BE_POSITIVE}` })
	capacity: number;
}
