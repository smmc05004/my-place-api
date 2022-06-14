import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import { jwtContants } from '../constant/constant';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(userId: string, pass: string): Promise<any> {
		const user = await this.usersService.getUserByUserId(userId);
		if (user && user.password === pass) {
			const { password, ...result } = user;
			// result는 password 를 제외한 user의 모든 정보를 포함한다.
			return result;
		}
		return null;
	}

	async login(user: any) {
		const payload = { username: user.name, sub: user.userId };
		const accessToken = await this.jwtService.signAsync(payload);

		return {
			access_token: accessToken,
		};
	}

	// async verify(token: string) {
	// 	const verifyResult = this.jwtService.verify(token, {
	// 		secret: jwtContants.secret,
	// 	});
	// 	console.log('verifyResult: ', verifyResult);
	// 	return verifyResult;
	// }
}
