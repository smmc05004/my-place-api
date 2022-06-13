import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	// constructor(private readonly authService: AuthService) {
	// 	super({ userId: '2218834352' });
	// }

	// async validate(userId): Promise<any> {
	// 	const user = this.authService.validateUser(userId);
	// 	console.log('user: ', user);
	// 	if (!user) {
	// 		throw new UnauthorizedException();
	// 	}

	// 	return user;
	// }
	constructor(private authService: AuthService) {
		super({ usernameField: 'userId' });
	}

	async validate(userId: string, password: string): Promise<any> {
		const user = await this.authService.validateUser(userId, password);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
