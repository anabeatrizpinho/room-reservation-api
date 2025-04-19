export class UserDeleteFailed extends Error {
	constructor() {
		super('Could not delete user.');
	}
}
