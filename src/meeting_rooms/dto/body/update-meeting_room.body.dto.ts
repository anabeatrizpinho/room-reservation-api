import { PartialType } from '@nestjs/mapped-types';
import {
	IsInt,
	IsOptional,
	IsPositive,
	IsString,
	MaxLength,
} from 'class-validator';
import {
	ValidationMessage,
	ValidatorValue,
} from 'src/common/enums/validatorValue.enum';
import { CreateMeetingRoomDto } from './create-meeting_room.body.dto';

export class UpdateMeetingRoomDto extends PartialType(CreateMeetingRoomDto) {
	@IsOptional()
	@IsString({ message: `Name ${ValidationMessage.INVALID_TYPE}` })
	@MaxLength(ValidatorValue.NAME_MAX_LENGTH, {
		message: `Name should be ${ValidatorValue.NAME_MAX_LENGTH} ${ValidationMessage.MAX_LENGTH}`,
	})
	name: string;

	@IsOptional()
	@IsInt({ message: `Capacity id ${ValidationMessage.BE_INTEGER}` })
	@IsPositive({ message: `Capacity id ${ValidationMessage.BE_POSITIVE}` })
	capacity: number;
}
