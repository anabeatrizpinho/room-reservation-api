import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ErrorHandlerService } from 'src/common/errors/errors.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '8h' },
		}),
		UsersModule,
	],
	providers: [
		LocalStrategy,
		JwtStrategy,
		ErrorHandlerService,
		AuthService,
		{
			provide: AuthRepository,
			useExisting: AuthService,
		},
	],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
