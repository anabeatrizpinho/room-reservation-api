import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from 'src/auth/types/jwtPayload';
import { UserNotFoundError } from 'src/users/errors/userNotFound.error';
import { UsersRepository } from 'src/users/users.repository';
import { AuthRepository } from './auth.repository';
import { InvalidCredentialsError } from './errors/invalidCredentials.error';
import { IAccessToken } from './types/accessToken';

@Injectable()
export class AuthService implements AuthRepository {
	constructor(
		private usersRepo: UsersRepository,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<User> {
		try {
			const user = await this.usersRepo.findOneByEmail(email);
			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) throw new InvalidCredentialsError();

			return user;
		} catch (e: any) {
			if (
				e instanceof UserNotFoundError ||
				e instanceof InvalidCredentialsError
			)
				throw new InvalidCredentialsError();
		}
	}

	async login(user: User): Promise<IAccessToken> {
		const payload: IJwtPayload = {
			sub: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		};
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
}
