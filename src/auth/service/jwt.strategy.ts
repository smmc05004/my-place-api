import {
	Injectable,
	BadRequestException,
	NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private authService: AuthService,
		private jwtService: JwtService,
	) {
		super({
			ignoreExpiration: true,
			passReqToCallback: true,
			secretOrKey: 'SECRETE',
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const accessToken = request?.headers['jwt_access_token'] as string;
					const refreshToken = request?.headers['jwt_refresh_token'] as string;

					return accessToken ? accessToken : refreshToken;
				},
			]),
		});
	}

	async validate(request: Request, payload: any) {
		const jwtAccessToken = request?.headers['jwt_access_token'] as string;
		const refresh_token = request?.headers['jwt_refresh_token'] as string;

		if (jwtAccessToken) {
			const decoded: any = await this.jwtService.verifyAsync(
				jwtAccessToken.toString(),
				{
					secret: 'SECRETE',
				},
			);

			if (decoded.userId !== payload.userId) {
				throw new NotFoundException();
			}

			return { userId: payload.userId, name: payload.name };
		} else {
			if (!refresh_token) {
				throw new BadRequestException();
			}

			const user = await this.authService.validateRefreshToken(
				payload.userId,
				refresh_token,
			);

			if (!user) {
				throw new NotFoundException();
			}

			// payload에 같이 들어있는 iat, exp 정보는 제외하고 반환
			return { userId: payload.userId, name: payload.name };
		}
	}
}
