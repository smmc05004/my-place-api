import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import * as moment from 'moment';

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

	async getAccessToken(user: any) {
		const payload = { name: user.name, userId: user.userId };
		const accessToken = await this.jwtService.signAsync(payload);
		return accessToken;
	}

	async verifyToken(cookie: string) {
		const data = await this.jwtService.verifyAsync(cookie, {
			secret: 'SECRETE',
		});

		return data;
	}

	async getRefreshToken(user: any) {
		const userId = user.userId;
		const payload = { name: user.name, userId: user.userId };

		const refreshToken = await this.getAccessToken(payload);
		const refreshTokenExp = moment().format('YYYY/MM/DD');

		let userDataToUpdate = {
			refreshToken,
			refreshTokenExp,
		};

		const updateResult = await this.usersService.updateUser(
			userId,
			userDataToUpdate,
		);

		if (!updateResult) {
			return null;
		}

		return userDataToUpdate.refreshToken;
	}

	async validateRefreshToken(email, refreshToken) {
		const currentDate = moment().format('YYYY/MM/DD');

		const user = await this.usersService.getUserByRefreshToken(
			email,
			refreshToken,
			currentDate,
		);

		return user;
	}
}
