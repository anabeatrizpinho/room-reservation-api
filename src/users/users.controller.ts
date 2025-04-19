import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { ErrorHandlerService } from 'src/common/errors/errors.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dto/body/create-user.body.dto';
import { UpdateUserDto } from './dto/body/update-user.body.dto';
import { UserDto } from './dto/expose/user.expose.dto';
import { UsersRepository } from './users.repository';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
	constructor(
		private readonly usersRepo: UsersRepository,
		private readonly errorHandlerService: ErrorHandlerService,
	) {}

	@Post()
	async create(@Body() body: CreateUserDto): Promise<User> {
		try {
			return await this.usersRepo.create(body);
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}

	@Get()
	async findAll(): Promise<User[]> {
		try {
			return await this.usersRepo.findAll();
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
		try {
			return await this.usersRepo.findOne({ id });
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}

	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: UpdateUserDto,
	): Promise<User> {
		try {
			return await this.usersRepo.update(id, body);
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
		try {
			return await this.usersRepo.remove({ id });
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}
}
