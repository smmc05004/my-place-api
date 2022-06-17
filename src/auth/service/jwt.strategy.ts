import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			ignoreExpiration: false,
			secretOrKey: 'SECRETE',
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const cookie = request?.cookies['jwt_access_token'];
					return cookie;
				},
			]),
		});
	}

	async validate(payload: any) {
		console.log('payload: ', payload);
		// payload에 같이 들어있는 iat, exp 정보는 제외하고 반환
		return { userId: payload.userId, name: payload.name };
	}
}
