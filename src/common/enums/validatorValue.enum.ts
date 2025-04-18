export enum ValidatorValue {
	NAME_MAX_LENGTH = 100,
	EMAIL_MAX_LENGTH = 150,
	PASSWORD_MAX_LENGHT = 255,
}

export enum ValidationMessage {
	MAX_LENGTH = 'characters long at maximum',
	NOT_EMPTY = 'should not be empty',
	BE_EMAIL = 'is not following an email pattern',
	INVALID_TYPE = 'presents an invalid value type',
	BE_POSITIVE = 'is not a positive number',
	BE_INTEGER = 'is not a integer number',
}
