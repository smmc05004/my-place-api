import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

// export type User = any;
@Injectable()
export class UserService {
	// constructor(private readonly prisma: PrismaService) {}

	// async getUsers(): Promise<User[]> {
	// 	const result = this.prisma.user.findMany();
	// 	return result;
	// }

	// // async getUserByUserId(userId: string): Promise<User | null> {
	// async getUserByUserId(userId: string): Promise<any> {
	// 	console.log('user service userId: ', userId);
	// 	// return this.prisma.user.findUnique({
	// 	// 	where: {
	// 	// 		userId,
	// 	// 	},
	// 	// });
	// 	return {
	// 		aa: 'aaa',
	// 	};
	// }

	private readonly users = [
		{
			userId: 1,
			username: 'john',
			password: 'changeme',
		},
		{
			userId: 2,
			username: 'maria',
			password: 'guess',
		},
	];

	async findOne(username: string): Promise<any> {
		return this.users.find((user) => user.username === username);
	}
}
