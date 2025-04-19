import { Prisma, User } from '@prisma/client';

export abstract class UsersRepository {
	abstract create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
	abstract findAll(): Promise<User[]>;
	abstract findOne(data: Prisma.UserWhereUniqueInput): Promise<User>;
	abstract findOneByEmail(email: string): Promise<User>;
	abstract update(id: number, data: Prisma.UserUpdateInput): Promise<User>;
	abstract remove(data: Prisma.UserWhereUniqueInput): Promise<User>;
}
