export class MeetingRoomCreationFailed extends Error {
	constructor() {
		super('Could not create meeting room.');
	}
}
