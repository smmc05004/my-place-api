import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
// import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	// constructor(private userService: UserService) {}

	// async validateUser(userId: string): Promise<any> {
	// 	console.log('auth service userId: ', userId);
	// 	const user = await this.userService.getUserByUserId(userId);
	// 	if (user) {
	// 		return user;
	// 	}

	// 	return null;
	// }

	constructor(
		private usersService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne(username);
		if (user && user.password === pass) {
			const { password, ...result } = user;
			// result는 password 를 제외한 user의 모든 정보를 포함한다.
			return result;
		}
		return null;
	}

	async login(user: any) {
		const payload = { username: user.username, sub: user.userId };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
