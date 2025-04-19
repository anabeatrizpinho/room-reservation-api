import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { EmailFoundError } from './errors/emailFound.error';
import { InvalidUserIdError } from './errors/invalidUserId.error';
import { UserCreationFailed } from './errors/userCreationFailed.error';
import { UserDeleteFailed } from './errors/userDeleteFailed.error';
import { UserNotFoundError } from './errors/userNotFound.error';
import { UserUpdateFailed } from './errors/userUpdateFailed.error';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService implements UsersRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
		const { email } = data;

		const userWithUniqueEmail = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (userWithUniqueEmail) throw new EmailFoundError();

		try {
			const hashedPassword = await bcrypt.hash(data.password, 10);
			return await this.prisma.user.create({
				data: { ...data, password: hashedPassword },
			});
		} catch (_e: any) {
			throw new UserCreationFailed();
		}
	}

	async findAll(): Promise<User[]> {
		return await this.prisma.user.findMany({ where: { deletedAt: null } });
	}

	async findOne(data: Prisma.UserWhereUniqueInput): Promise<User> {
		const { id } = data;
		if (!id || id <= 0) throw new InvalidUserIdError();

		const user = await this.prisma.user.findUnique({
			where: { id, deletedAt: null },
		});

		if (!user) throw new UserNotFoundError();

		return user;
	}

	async findOneByEmail(email: string): Promise<User> {
		const user = this.prisma.user.findUnique({
			where: { email, deletedAt: null },
		});

		if (!user) throw new UserNotFoundError();

		return user;
	}

	async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
		try {
			await this.findOne({ id });
			return await this.prisma.user.update({
				where: { id },
				data: {
					...data,
					updatedAt: new Date(),
				},
			});
		} catch (e: any) {
			if (e instanceof InvalidUserIdError || e instanceof UserNotFoundError)
				throw e;
			throw new UserUpdateFailed();
		}
	}

	async remove(data: Prisma.UserWhereUniqueInput): Promise<User> {
		const { id } = data;

		try {
			await this.findOne({ id });
			return await this.prisma.user.update({
				where: { id },
				data: {
					deletedAt: new Date(),
				},
			});
		} catch (e: any) {
			if (e instanceof InvalidUserIdError || e instanceof UserNotFoundError)
				throw e;
			throw new UserDeleteFailed();
		}
	}
}
