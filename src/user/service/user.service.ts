import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUsers(): Promise<User[]> {
		const result = this.prisma.user.findMany();
		return result;
	}

	async getUserByUserId(userId: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: {
				useId: userId,
			},
		});
	}
}
