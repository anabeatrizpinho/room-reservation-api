export class ReservationUpdateFailed extends Error {
	constructor() {
		super('Could not update reservation.');
	}
}
