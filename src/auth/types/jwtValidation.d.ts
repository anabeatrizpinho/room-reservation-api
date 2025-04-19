import { Role } from '@prisma/client';

export interface IJwtValidation {
	userId: number;
	cn: string;
	displayName: string;
	role: Role;
}
