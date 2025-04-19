import { Module } from '@nestjs/common';
import { ErrorHandlerService } from 'src/common/errors/errors.service';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
	controllers: [UsersController],
	providers: [
		PrismaService,
		ErrorHandlerService,
		UsersService,
		{
			provide: UsersRepository,
			useExisting: UsersService,
		},
	],
	exports: [UsersRepository],
})
export class UsersModule {}
