import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/service/auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
	constructor(private authService: AuthService) {
		super({
			ignoreExpiration: true,
			passReqToCallback: true,
			secretOrKey: 'SECRETE',
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const cookie = request?.cookies['jwt_refresh_token'];
					return cookie;
				},
			]),
		});
	}

	async validate(request: Request, payload: any) {
		const refresh_token = request?.cookies['jwt_refresh_token'];

		if (!refresh_token) {
			throw new BadRequestException();
		}

		const user = await this.authService.validateRefreshToken(
			payload.userId,
			refresh_token,
		);

		if (!user) {
			return { userId: null };
		}

		return { userId: user.userId, name: user.name };
	}
}
