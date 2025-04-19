export class ReservationDeleteFailed extends Error {
	constructor() {
		super('Could not delete reservation.');
	}
}
