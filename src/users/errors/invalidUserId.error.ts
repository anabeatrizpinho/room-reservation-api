export class InvalidUserIdError extends Error {
	constructor() {
		super('Invalid user ID provided.');
	}
}
