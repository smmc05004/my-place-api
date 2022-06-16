import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async updateUser(userId, data) {
		const result = await this.prisma.user.update({
			where: {
				userId,
			},
			data: data,
		});

		return result;
	}

	async getUserByUserId(userId: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				userId,
			},
		});

		return user;
	}

	async getUserByRefreshToken(
		userId: string,
		refreshToken: string,
		currentDate: any,
	) {
		const user = await this.prisma.user.findFirst({
			where: {
				userId: userId,
				refreshToken: refreshToken,
				refreshTokenExp: {
					gte: currentDate,
				},
			},
		});

		return user;
	}
}
