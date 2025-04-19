export class MeetingRoomDeleteFailed extends Error {
	constructor() {
		super('Could not delete meeting room.');
	}
}
