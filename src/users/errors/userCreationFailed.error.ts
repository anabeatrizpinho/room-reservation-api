export class UserCreationFailed extends Error {
	constructor() {
		super('Could not create user.');
	}
}
