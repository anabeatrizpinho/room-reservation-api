import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ErrorHandlerService } from 'src/common/errors/errors.service';
import { AuthRepository } from './auth.repository';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authRepo: AuthRepository,
		private readonly errorHandlerService: ErrorHandlerService,
	) {}

	@UseGuards(AuthGuard('local'))
	@Post()
	async login(@Request() req) {
		try {
			return await this.authRepo.login(req.user);
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}
}
