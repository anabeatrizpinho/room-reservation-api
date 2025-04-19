export class InvalidMeetingRoomIdError extends Error {
	constructor() {
		super('Invalid Meeting Room ID provided.');
	}
}
