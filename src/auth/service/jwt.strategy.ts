import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtContants } from '../constant/constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request) => {
					console.log('req: ', request);
					const cookie = request?.cookies['jwt'];
					console.log('cookiesss: ', cookie);
					return cookie;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: jwtContants.secret,
		});
	}

	async validate(payload: any) {
		return { userId: payload.sub, username: payload.username };
	}
}
