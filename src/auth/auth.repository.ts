import { User } from '@prisma/client';
import { IAccessToken } from './types/accessToken';

export abstract class AuthRepository {
	abstract validateUser(email: string, password: string): Promise<User>;
	abstract login(user: User): Promise<IAccessToken>;
}
