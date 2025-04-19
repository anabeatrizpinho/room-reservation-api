export class EndTimeBeforeStartError extends Error {
	constructor() {
		super('End time must be later than start time.');
	}
}
