export class MeetingRoomUpdateFailed extends Error {
	constructor() {
		super('Could not update meeting room.');
	}
}
