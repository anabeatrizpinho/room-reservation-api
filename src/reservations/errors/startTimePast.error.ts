export class StartTimePastError extends Error {
	constructor() {
		super('Start time must be in the future.');
	}
}
