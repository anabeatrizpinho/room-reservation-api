export class UserUpdateFailed extends Error {
	constructor() {
		super('Could not update user.');
	}
}
