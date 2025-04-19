import { Role } from '@prisma/client';

export interface IJwtPayload {
	sub: number;
	name: string;
	email: string;
	role: Role;
}
