export class MeetingRoomNotFoundError extends Error {
	constructor() {
		super('Meeting Room not found.');
	}
}
