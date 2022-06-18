import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async setUserAtHead(token: string, req) {
		const decoded = await this.jwtService.verifyAsync(token.toString(), {
			secret: 'SECRETE',
		});

		if (typeof decoded === 'object' && decoded.hasOwnProperty('userId')) {
			try {
				const user = await this.userService.getUserByUserId(decoded.userId);
				console.log('user: ', user);

				req['user'] = user;
			} catch (error) {
				console.log('setUserAtHead 에러');
				// throw new ForbiddenException('error', 'Please Login');
				return error;
			}
		}
	}

	async use(req: Request, res: Response, next: NextFunction) {
		console.log('middleware 실행');
		const headers = req.headers;
		console.log('headers: ', headers)

		if ('jwt_access_token' in headers) {
			// console.log('jwt_access_token 체크');
			const accessToken = headers['jwt_access_token'].toString();
			await this.setUserAtHead(accessToken, req);

		} else if ('jwt_refresh_token' in headers) {
			// console.log('jwt_refresh_token 체크');
			const refreshToken = headers['jwt_refresh_token'].toString();
			await this.setUserAtHead(refreshToken, req);

		}

		next();
	}
}
