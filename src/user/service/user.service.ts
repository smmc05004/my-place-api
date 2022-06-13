import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

// export type User = any;
@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUserByUserId(userId: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				userId,
			},
		});

		return user;
	}
}
