export class ReservationCreationFailed extends Error {
	constructor() {
		super('Could not create reservation.');
	}
}
