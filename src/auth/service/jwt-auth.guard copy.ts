import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGard extends AuthGuard('jwt') {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: JwtService,
	) {
		super();
	}
	// canActivate(
	// 	context: ExecutionContext,
	// ): boolean | Promise<boolean> | Observable<boolean> {
	// 	try {
	// 		// console.log('context: ', context);
	// 		// console.log('jwt guard 실행');
	// 		// console.log('request: ', context.switchToHttp().getRequest());
	// 		super.logIn(context.switchToHttp().getRequest());
	// 		return super.canActivate(context);
	// 	} catch (error) {
	// 		throw new UnauthorizedException('please login');
	// 	}
	// }

	async canActivate(context: ExecutionContext) {
		const result = (await super.canActivate(context)) as boolean;
		const { user } = context.switchToHttp().getRequest();
		console.log('canActivate 실행');
		console.log('request: ', user);
		try {
			await super.logIn(user);
			return result;
		} catch (error) {
			throw new UnauthorizedException('please login');
		}
	}

	handleRequest(
		err: any,
		user: any,
		info: any,
		context: any,
		status?: any,
	): any {
		console.log('err: ', err);
		console.log('handleRequest 실행');
		console.log('user: ', user);
		console.log('info: ', info);
		// console.log('context: ', context);
		if (typeof info !== 'undefined') {
			if (info.name === 'TokenExpiredError') {
				throw new UnauthorizedException('token expired', 'expiredToken');
			} else {
				throw new UnauthorizedException('token invalid', 'badToken');
			}
		} else {
			return user;
		}
	}
	// handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
}
