import {
	CanActivate,
	ExecutionContext,
	HttpException,
	// HttpStatus,
	// UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		console.log('guard 실행');
		const request = context.switchToHttp().getRequest();
		// console.log('request: ', request);
		const user = request['user'];
		console.log('auth guard: ', user);

		if (!user) {
			throw new HttpException('There is no token', 500);
			// throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
		}
		return true;
	}
}
