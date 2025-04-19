import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthRepository } from '../auth.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authRepo: AuthRepository) {
		super({ usernameField: 'email' });
	}

	async validate(email: string, password: string): Promise<any> {
		const user = await this.authRepo.validateUser(email, password);
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}
		return user;
	}
}
