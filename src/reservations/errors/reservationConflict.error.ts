export class ReservationConflictError extends Error {
	constructor() {
		super('Conflict with existing reservation.');
	}
}
