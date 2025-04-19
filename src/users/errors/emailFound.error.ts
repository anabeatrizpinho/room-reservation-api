export class EmailFoundError extends Error {
	constructor() {
		super('This email address is already registered.');
	}
}
