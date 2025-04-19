export class InvalidReservationIdError extends Error {
	constructor() {
		super('Invalid reservation ID provided.');
	}
}
