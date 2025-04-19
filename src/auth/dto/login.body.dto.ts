export class CreateAuthDto {}
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ValidationMessage } from 'src/common/enums/validatorValue.enum';

export class LoginBodyDto {
	@IsNotEmpty({ message: `Email ${ValidationMessage.NOT_EMPTY}` })
	@IsEmail()
	email: string;

	@IsNotEmpty({ message: `Password ${ValidationMessage.NOT_EMPTY}` })
	@IsString({ message: `Password ${ValidationMessage.INVALID_TYPE}` })
	password: string;
}
