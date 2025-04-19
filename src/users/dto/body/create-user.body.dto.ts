import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import {
	ValidationMessage,
	ValidatorValue,
} from 'src/common/enums/validatorValue.enum';

export class CreateUserDto {
	@IsNotEmpty({ message: `Name ${ValidationMessage.NOT_EMPTY}` })
	@IsString({ message: `Name ${ValidationMessage.INVALID_TYPE}` })
	@MaxLength(ValidatorValue.NAME_MAX_LENGTH, {
		message: `Title should be ${ValidatorValue.NAME_MAX_LENGTH} ${ValidationMessage.MAX_LENGTH}`,
	})
	name: string;

	@IsNotEmpty({ message: `Email ${ValidationMessage.NOT_EMPTY}` })
	@IsEmail({}, { message: `Email ${ValidationMessage.BE_EMAIL}` })
	@MaxLength(ValidatorValue.EMAIL_MAX_LENGTH, {
		message: `Email should be ${ValidatorValue.EMAIL_MAX_LENGTH} ${ValidationMessage.MAX_LENGTH}`,
	})
	email: string;

	@IsNotEmpty({ message: `Password ${ValidationMessage.NOT_EMPTY}` })
	@IsString({ message: `Password ${ValidationMessage.INVALID_TYPE}` })
	@MaxLength(ValidatorValue.PASSWORD_MAX_LENGHT, {
		message: `Password should be ${ValidatorValue.PASSWORD_MAX_LENGHT} ${ValidationMessage.MAX_LENGTH}`,
	})
	password: string;
}
